---
name: clone-repo
description: Clone a GitHub repo into the user's Codex workspaces directory (default: ~/codex-workspaces). Optionally copies this setup workspace's .env.local into the cloned repo.
---

# Clone a repo into your Codex workspaces

Run:

```bash
bash skills/clone-repo/scripts/clone-repo-into-workspaces.sh --repo "<OWNER>/<REPO>"
```

Example:

```bash
bash skills/clone-repo/scripts/clone-repo-into-workspaces.sh --repo "octocat/Hello-World"
```
