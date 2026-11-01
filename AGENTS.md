# Website source and agent workflow

The intended checkout is `~/repos/olympic-ridge-hoa`, backed by the public
`keegoid/olympic-ridge-hoa` repository. Private board tools belong in the separate
`~/repos/board-workspace` checkout; never add private records, snapshots,
credentials, transcripts or resident information to this public website.

Follow the current workflow in `~/keegoid/CLAUDE.md` and use helpers under
`~/keegoid/ops/bin/`:

- Commits: `git-as fig` through `agent-pr-flow commit`.
- GitHub actions: `gh-as fig`; never use the human identity for agent work.
- PR flow: `agent-pr-flow`, with `--actor fig --model codex` for Codex-backed
  changes and the required independent Claude review of the current head.

Before building a fresh clone, initialize the existing pinned theme:

    git submodule update --init --recursive -- themes/PaperMod
    hugo --minify

Keep the pinned theme revision unless an upgrade is separately requested.
A successful local build does not authorize publishing. A main-branch merge can
trigger connected hosting, so respect the requested publication scope before
merging changes. Checkout preparation alone must not redeploy the live website.
