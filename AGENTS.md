# Agent Workflow

This repo participates in Keegoid LLC's bot-identity PR flow.
Agents MUST use the helpers in `~/keegoid/CLAUDE.md`:

- Commits: `~/keegoid/bin/git-as <bot> ...` (never raw `git commit`).
- GitHub actions: `~/keegoid/bin/gh-as <bot> ...` (never raw `gh`).
- PR flow: `~/keegoid/bin/agent-pr-flow`.

Bot identities: `keegoid-fig`, `keegoid-codex`. Reviewer identity must
match the required reviewer label on the PR — do not run a review under
the wrong bot.
