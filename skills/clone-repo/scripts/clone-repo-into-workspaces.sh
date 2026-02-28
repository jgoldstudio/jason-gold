#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETUP_REPO_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"
SETUP_SCRIPT="$SETUP_REPO_DIR/skills/setup/scripts/bootstrap-home-codex-setup.sh"

REPO_SLUG=""
TARGET_DIR=""
COPY_ENV=true

print_usage() {
  cat <<'EOF'
Usage: clone-repo-into-workspaces.sh --repo "<OWNER>/<REPO>" [options]

Options:
  --repo <slug>        Required. e.g. "octocat/Hello-World"
  --dir <path>         Optional. Target directory (defaults to ~/codex-workspaces/<repo>)
  --no-env             Do not copy this workspace's .env.local into the cloned repo
  -h, --help           Show help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --repo) REPO_SLUG="${2:-}"; shift 2;;
    --dir) TARGET_DIR="${2:-}"; shift 2;;
    --no-env) COPY_ENV=false; shift;;
    -h|--help) print_usage; exit 0;;
    *) echo "❌ Error: unknown argument: $1"; print_usage; exit 1;;
  esac
done

if [[ -z "$REPO_SLUG" ]]; then
  echo "❌ Error: --repo is required."
  print_usage
  exit 1
fi

# Load optional workspace dir from config/user.env if present
WORKSPACES_DIR="$HOME/codex-workspaces"
if [[ -f "$SETUP_REPO_DIR/config/user.env" ]]; then
  # shellcheck disable=SC1090
  source "$SETUP_REPO_DIR/config/user.env" || true
  [[ -n "${CODEX_WORKSPACES_DIR:-}" ]] && WORKSPACES_DIR="${CODEX_WORKSPACES_DIR}"
fi

repo_name="$(basename "$REPO_SLUG")"
if [[ -z "$TARGET_DIR" ]]; then
  TARGET_DIR="$WORKSPACES_DIR/$repo_name"
fi

echo "Starting repo clone into: $TARGET_DIR"

# Ensure base setup
bash "$SETUP_SCRIPT" >/dev/null

mkdir -p "$WORKSPACES_DIR"
if [[ -d "$TARGET_DIR/.git" ]]; then
  echo "Repo already exists. Fetching latest..."
  (cd "$TARGET_DIR" && git fetch --all --prune)
  echo "✅ Updated repo."
elif [[ -d "$TARGET_DIR" ]]; then
  echo "❌ Error: $TARGET_DIR exists but is not a git repo."
  exit 1
else
  gh repo clone "$REPO_SLUG" "$TARGET_DIR"
  echo "✅ Cloned repo."
fi

if [[ "$COPY_ENV" == true && -f "$SETUP_REPO_DIR/.env.local" ]]; then
  cp "$SETUP_REPO_DIR/.env.local" "$TARGET_DIR/.env.local"
  echo "✅ Copied .env.local into repo."
fi

echo "✅ Done. Repo path:"
echo "$TARGET_DIR"
