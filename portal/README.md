# Client Portal

Everything in this folder is served at **portal.multiplylocal.com** (configured via the
host-based rewrite in the root `vercel.json`).

- `index.html` → portal.multiplylocal.com
- Any new page here, e.g. `login.html` → portal.multiplylocal.com/login (cleanUrls strips `.html`)

## One-time Vercel/DNS setup

For the subdomain to resolve, add `portal.multiplylocal.com` as a domain on this Vercel
project (Project → Settings → Domains) and add the CNAME record Vercel shows you at your
DNS provider. The rewrite in `vercel.json` takes care of the rest.
