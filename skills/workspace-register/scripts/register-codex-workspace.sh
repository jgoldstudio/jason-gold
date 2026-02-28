#!/usr/bin/env bash
set -euo pipefail

TARGET_DIR=""
CODEX_DIR="$HOME/.codex"
CONFIG_TOML="$CODEX_DIR/config.toml"
GLOBAL_STATE_JSON="$CODEX_DIR/.codex-global-state.json"
LABEL=""

print_usage() {
  cat <<'EOF'
Usage: register-codex-workspace.sh --path "<absolute-path>" [--label "<label>"]

Registers a folder as a trusted workspace in Codex by updating:
- ~/.codex/config.toml
- ~/.codex/.codex-global-state.json

Options:
  --path <path>        Required. Absolute path to the workspace root.
  --label <label>      Optional. Display label in Codex.
  -h, --help           Show help
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --path) TARGET_DIR="${2:-}"; shift 2;;
    --label) LABEL="${2:-}"; shift 2;;
    -h|--help) print_usage; exit 0;;
    *) echo "❌ Error: unknown argument: $1"; print_usage; exit 1;;
  esac
done

if [[ -z "$TARGET_DIR" ]]; then
  echo "❌ Error: --path is required."
  print_usage
  exit 1
fi

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "❌ Error: path does not exist: $TARGET_DIR"
  exit 1
fi

if [[ -z "$LABEL" ]]; then
  LABEL="$(basename "$TARGET_DIR")"
fi

echo "Registering Codex workspace for: $TARGET_DIR"

if [[ ! -f "$CONFIG_TOML" ]]; then
  echo "❌ Error: Codex config not found at $CONFIG_TOML"
  exit 1
fi

if [[ ! -f "$GLOBAL_STATE_JSON" ]]; then
  echo "❌ Error: Codex global state not found at $GLOBAL_STATE_JSON"
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "❌ Error: jq is required to update Codex global state."
  echo "Install it on Mac with: brew install jq"
  exit 1
fi

timestamp="$(date +%Y%m%d-%H%M%S)"
cp "$CONFIG_TOML" "$CONFIG_TOML.bak.$timestamp"
cp "$GLOBAL_STATE_JSON" "$GLOBAL_STATE_JSON.bak.$timestamp"

echo
echo "Step 1: Trusting this workspace in config.toml..."
if grep -Fq "[projects.\"$TARGET_DIR\"]" "$CONFIG_TOML"; then
  echo "Trust entry already present."
else
  cat >>"$CONFIG_TOML" <<EOF

[projects."$TARGET_DIR"]
trust_level = "trusted"
EOF
  echo "✅ Added trust entry."
fi

echo
echo "Step 2: Adding workspace to Codex global state..."
tmp_json="$(mktemp)"

jq \
  --arg root "$TARGET_DIR" \
  --arg label "$LABEL" \
  '
  .["electron-saved-workspace-roots"] = (
    (.["electron-saved-workspace-roots"] // []) as $roots
    | if ($roots | index($root)) then $roots else ($roots + [$root]) end
  )
  | .["electron-workspace-root-labels"] = (
    (.["electron-workspace-root-labels"] // {}) + {($root): $label}
  )
  ' \
  "$GLOBAL_STATE_JSON" >"$tmp_json"

mv "$tmp_json" "$GLOBAL_STATE_JSON"

echo
echo "✅ Done. Restart Codex to see the workspace."
