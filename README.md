# Olympic Ridge HOA

Official Website for the Olympic Ridge Homeowners Association in Belfair, WA.

## Deployment

Cloudflare deploys the production website automatically from the repository's
`main` branch. A push to `origin/main` starts the Cloudflare build and
deployment; there is no separate manual deployment command in this repository.

Before pushing:

1. Confirm that the changes contain only information intended for the public
   website and do not include private board records, personal contact details,
   credentials, or other sensitive material.
2. Build the site locally with `hugo --minify` and resolve any build errors.
3. Run `git diff --check` and review the exact files that will be committed.
4. Commit and push the approved changes to `origin/main` using the repository's
   required author identity and Git workflow.

After pushing, wait for Cloudflare's automatic deployment and verify
[olympicridgehoa.com](https://olympicridgehoa.com/) and the changed pages or
assets in production. If production does not update, inspect the Cloudflare
deployment status and build logs for the commit before retrying or making more
changes.
