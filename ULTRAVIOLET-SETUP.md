# CocoX.wtf Browser — Ultraviolet deployment

This version changes the Render service from a Static Site to a Node Web Service. Ultraviolet needs a server for its runtime assets and Wisp WebSocket transport.

## Render

Use the included `render.yaml` Blueprint, or configure:

- Runtime: Node
- Build command: `pnpm install --no-frozen-lockfile && pnpm --filter @workspace/cocox-home build && pnpm --filter @workspace/api-server build`
- Start command: `pnpm --filter @workspace/api-server start`
- Health check: `/api/health`

The first install uses `--no-frozen-lockfile` because the added Ultraviolet packages must be resolved into the existing pnpm lockfile during Render's build. Commit the refreshed `pnpm-lock.yaml` after the first successful install if you want to restore frozen installs.

## Notes

Ultraviolet is unmaintained and its upstream project recommends Scramjet as its successor. Site compatibility is not guaranteed; TikTok may still restrict playback, sign-in, or requests made through a proxy. Keep the service private to your own use and follow the sites' terms.
