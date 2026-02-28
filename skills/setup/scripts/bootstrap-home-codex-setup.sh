#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETUP_REPO_DIR="$(cd "$SCRIPT_DIR/../../.." && pwd)"

AUTH_SKILL_SCRIPT="$SETUP_REPO_DIR/skills/auth/scripts/setup-github-ssh-key.sh"

SETUP_MARKER_FILE="$SETUP_REPO_DIR/.home-codex-setup-complete"
FORCE_SETUP_REFRESH=false

USER_ENV="$SETUP_REPO_DIR/config/user.env"
USER_ENV_EXAMPLE="$SETUP_REPO_DIR/config/user.env.example"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --force)
      FORCE_SETUP_REFRESH=true
      shift
      ;;
    *)
      echo "❌ Error: unknown argument: $1"
      exit 1
      ;;
  esac
done

success_messages=()
warning_messages=()
failure_messages=()

log_step() { echo; echo "==> $1"; }
log_success() { success_messages+=("$1"); echo "✅ $1"; }
log_warning() { warning_messages+=("$1"); echo "⚠️  $1"; }
log_failure() { failure_messages+=("$1"); echo "❌ $1"; }

print_summary() {
  echo
  echo "=================================================="
  echo "Setup Summary: GitHub + Codex"
  echo "=================================================="
  echo
  echo "Successes:"
  if [ "${#success_messages[@]}" -eq 0 ]; then
    echo "✅ None recorded."
  else
    for message in "${success_messages[@]}"; do echo "✅ $message"; done
  fi

  echo
  echo "Failures:"
  if [ "${#failure_messages[@]}" -eq 0 ]; then
    echo "❌ None."
  else
    for message in "${failure_messages[@]}"; do echo "❌ $message"; done
  fi

  if [ "${#warning_messages[@]}" -gt 0 ]; then
    echo
    echo "Warnings:"
    for message in "${warning_messages[@]}"; do echo "⚠️  $message"; done
  fi
  echo
}

abort_setup() {
  log_failure "$1"
  print_summary
  exit 1
}

setup_marker_exists() {
  [[ -f "$SETUP_MARKER_FILE" ]]
}

require_cmd() {
  local cmd="$1"
  command -v "$cmd" >/dev/null 2>&1 || return 1
  return 0
}

echo "Starting your setup..."

if [ "$FORCE_SETUP_REFRESH" = false ] && setup_marker_exists; then
  log_success "GitHub and Codex setup is already complete."
  log_success "You are now set up to use GitHub and Codex."
  print_summary
  exit 0
fi

if [ "$FORCE_SETUP_REFRESH" = true ] && setup_marker_exists; then
  log_warning "Refreshing GitHub and Codex setup checks."
fi

log_step "Checking your GitHub tools"
if ! require_cmd gh; then
  if require_cmd brew; then
    echo "GitHub tools are missing. Installing what is needed..."
    if ! brew install gh; then
      abort_setup "Could not install the required GitHub tools (gh)."
    fi
  else
    abort_setup "GitHub tools (gh) are missing and automatic install is unavailable. Install GitHub CLI and re-run."
  fi
fi
log_success "GitHub tools are ready."

log_step "Signing into GitHub (if needed)"
if ! gh auth status -h github.com >/dev/null 2>&1; then
  echo "You’ll be asked to sign into GitHub in your browser."
  if ! gh auth login --hostname github.com --git-protocol https --web; then
    abort_setup "GitHub sign-in did not complete."
  fi
fi
log_success "GitHub sign-in is ready."

log_step "Connecting GitHub sign-in with git commands"
if gh auth setup-git >/dev/null 2>&1; then
  log_success "GitHub sign-in is connected to git."
else
  log_warning "Could not connect GitHub sign-in to git; continuing."
fi

log_step "Setting up secure SSH access (recommended)"
if [ ! -f "$AUTH_SKILL_SCRIPT" ]; then
  abort_setup "Secure access setup script was not found at: $AUTH_SKILL_SCRIPT"
fi

# Use a personal-but-specific key name so we don't collide with other keys.
# Non-destructive by default.
if bash "$AUTH_SKILL_SCRIPT" \
  --key-path "$HOME/.ssh/id_ed25519_github_personal" \
  --title "github-personal" \
  --email "$(gh api user --jq .login 2>/dev/null || echo "github-personal")" \
  --skip-verify >/dev/null 2>&1; then
  log_success "SSH key is set up for GitHub."
else
  log_warning "SSH key setup did not finish cleanly; continuing."
fi

log_step "Optional: setting your git name/email (if provided)"
if [ -f "$USER_ENV" ]; then
  # shellcheck disable=SC1090
  source "$USER_ENV" || true

  if [[ -n "${GIT_USER_NAME:-}" ]]; then
    git config --global user.name "$GIT_USER_NAME" && log_success "Git user.name is set."
  else
    log_warning "GIT_USER_NAME is missing in config/user.env; skipping."
  fi

  if [[ -n "${GIT_USER_EMAIL:-}" ]]; then
    git config --global user.email "$GIT_USER_EMAIL" && log_success "Git user.email is set."
  else
    log_warning "GIT_USER_EMAIL is missing in config/user.env; skipping."
  fi
else
  log_warning "No config/user.env found. (Optional) Copy $USER_ENV_EXAMPLE to config/user.env to set name/email."
fi

log_step "Saving setup completion status"
mkdir -p "$(dirname "$SETUP_MARKER_FILE")" || true
date -u +"%Y-%m-%dT%H:%M:%SZ" > "$SETUP_MARKER_FILE" || log_warning "Could not write setup completion marker."

log_success "Saved setup completion status."
log_success "You are now set up to use GitHub and Codex."
print_summary
