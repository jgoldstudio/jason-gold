#!/usr/bin/env bash
set -euo pipefail

KEY_PATH="${HOME}/.ssh/id_ed25519_github_personal"
KEY_TYPE="authentication"
TITLE=""
EMAIL=""
FORCE=false
SKIP_VERIFY=false

print_usage() {
  cat <<'EOF'
Usage: setup-github-ssh-key.sh [options]

Creates (or reuses) an SSH key, adds it to ssh-agent, registers it with GitHub via `gh ssh-key add`,
and optionally verifies SSH access.

Options:
  --key-path <path>    Private key path (default: ~/.ssh/id_ed25519_github_personal)
  --title <title>      GitHub SSH key title (default: <hostname>-<yyyymmdd>)
  --email <value>      Comment written into key; email or label
  --type <type>        Key type for GitHub API: authentication|signing (default: authentication)
  --force              Replace existing key at --key-path (creates timestamped backups first)
  --skip-verify        Skip final `ssh -T git@github.com` check
  -h, --help           Show help
EOF
}

require_cmd() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || { echo "error: required command not found: $cmd" >&2; exit 1; }
}

timestamp() { date +"%Y%m%d%H%M%S"; }

while [[ $# -gt 0 ]]; do
  case "$1" in
    --key-path) KEY_PATH="${2:-}"; shift 2;;
    --title) TITLE="${2:-}"; shift 2;;
    --email) EMAIL="${2:-}"; shift 2;;
    --type) KEY_TYPE="${2:-}"; shift 2;;
    --force) FORCE=true; shift;;
    --skip-verify) SKIP_VERIFY=true; shift;;
    -h|--help) print_usage; exit 0;;
    *) echo "error: unknown argument: $1" >&2; print_usage >&2; exit 1;;
  esac
done

if [[ -z "${TITLE}" ]]; then
  TITLE="$(hostname)-$(date +%Y%m%d)"
fi

if [[ "${KEY_TYPE}" != "authentication" && "${KEY_TYPE}" != "signing" ]]; then
  echo "error: --type must be one of: authentication, signing" >&2
  exit 1
fi

require_cmd gh
require_cmd ssh-keygen
require_cmd ssh-agent
require_cmd ssh-add
require_cmd ssh

if ! gh auth status -h github.com >/dev/null 2>&1; then
  echo "info: gh is not authenticated. Starting login flow..."
  gh auth login --hostname github.com --git-protocol https --web
fi

mkdir -p "${HOME}/.ssh"
chmod 700 "${HOME}/.ssh"

if [[ -f "${KEY_PATH}" || -f "${KEY_PATH}.pub" ]]; then
  if [[ "${FORCE}" == true ]]; then
    [[ -f "${KEY_PATH}" ]] && cp "${KEY_PATH}" "${KEY_PATH}.bak.$(timestamp)"
    [[ -f "${KEY_PATH}.pub" ]] && cp "${KEY_PATH}.pub" "${KEY_PATH}.pub.bak.$(timestamp)"
    rm -f "${KEY_PATH}" "${KEY_PATH}.pub"
  else
    echo "info: existing key found at ${KEY_PATH}; reusing it."
  fi
fi

if [[ ! -f "${KEY_PATH}" ]]; then
  comment="${EMAIL:-${TITLE}}"
  ssh-keygen -t ed25519 -C "${comment}" -f "${KEY_PATH}" -N ""
  echo "info: created new SSH key at ${KEY_PATH}"
fi

# Start ssh-agent if needed
if [[ -z "${SSH_AUTH_SOCK:-}" ]]; then
  eval "$(ssh-agent -s)" >/dev/null
fi

ssh-add "${KEY_PATH}" >/dev/null

# Register with GitHub unless already present
pubkey="$(cat "${KEY_PATH}.pub")"
if gh ssh-key list --json key --jq '.[].key' | grep -Fq "${pubkey}"; then
  echo "info: SSH key already registered with GitHub."
else
  gh ssh-key add "${KEY_PATH}.pub" --title "${TITLE}" --type "${KEY_TYPE}" >/dev/null
  echo "info: SSH key registered with GitHub."
fi

if [[ "${SKIP_VERIFY}" == false ]]; then
  set +e
  ssh -o StrictHostKeyChecking=accept-new -T git@github.com
  rc=$?
  set -e
  # ssh returns 1 for "success but no shell access" on GitHub; treat 1 as ok.
  if [[ $rc -eq 1 || $rc -eq 0 ]]; then
    echo "info: SSH connectivity looks good."
  else
    echo "warning: SSH verification failed (exit ${rc})." >&2
    exit $rc
  fi
fi
