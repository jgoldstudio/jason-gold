---
name: workspace-register
description: Register a local folder as a trusted Codex workspace by updating ~/.codex/config.toml and ~/.codex/.codex-global-state.json
---

# Register a Codex workspace

Run:

```bash
bash skills/workspace-register/scripts/register-codex-workspace.sh --path "<absolute-path>"
```

Example:

```bash
bash skills/workspace-register/scripts/register-codex-workspace.sh --path "$HOME/codex-workspaces/my-project"
```

Notes:
- This edits files under `~/.codex/`.
- It creates timestamped backups before changing anything.
- If Codex is open, restart it after running this.
