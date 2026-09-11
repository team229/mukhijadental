> **Mandatory Workflow:** See [`../AGENT.md`](../AGENT.md) for required `git pull` before any edit and `commit+push` before `build/deploy`. Read `../.repos.json` for repo/token mapping.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

> **Port 48173 Contract:** This site is served via `web.clickboostmedia.com` tunnel (`cfc1e0b6...` `~/.cloudflared/config-web.yml`). **Always** use `127.0.0.1:48173`. If busy → kill 48173 first (see `../AGENT.md:10`), never kill 3456. Verify via `npx astro dev status` and `curl http://127.0.0.1:48173`. Vite `allowedHosts` must include `web.clickboostmedia.com`.

Quick start on 48173:

```bash
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"; nvm use 22
# kill if occupied then start
fuser -k 48173/tcp 2>/dev/null; lsof -ti :48173 2>/dev/null | xargs -r kill -9
bash -c 'export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"; cd /home/ec2-user/Clickboostmedia/websites/mukhijadentalclinic.com; npx astro dev stop' 2>&1; sleep 2
bash -c 'export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"; cd /home/ec2-user/Clickboostmedia/websites/mukhijadentalclinic.com; timeout 15 npx astro dev --port 48173 --host 127.0.0.1' 2>&1 &
bash -c 'export PATH="$HOME/.nvm/versions/node/v22.23.2/bin:$PATH"; cd /home/ec2-user/Clickboostmedia/websites/mukhijadentalclinic.com; npx astro dev status' 2>&1
```

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
