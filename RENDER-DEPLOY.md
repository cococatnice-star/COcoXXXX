# Deploy CocoX.wtf Browser to Render

This project is a Vite/React browser interface. The included `render.yaml` configures it as a Render Static Site; it does not require a separate Node server or a proxy backend.

## Deploy

1. Push this project folder to a GitHub repository you control.
2. In Render, choose **New → Blueprint** and connect that repository.
3. Render reads `render.yaml`, installs the pnpm workspace, builds `@workspace/cocox-home`, and publishes `artifacts/cocox-home/dist/public`.
4. When the deploy finishes, open the generated `onrender.com` address.

The build sets `BASE_PATH=/` and a default `PORT` so Vite configuration also works in Render's build environment.

## Search and website navigation

- Enter a full web address (for example, `https://example.com`) to open it in the browser view.
- Enter ordinary search words to open a DuckDuckGo search URL.
- The external-open control opens the current address in a regular browser tab.

Some websites intentionally block iframe embedding or restrict playback in embedded browsers. This interface cannot override those website policies; use the site's normal browser tab when embedding is refused.

## Important

This is a static browser shell, not a full network proxy. It does not include Zaluea or functionality intended to bypass school network restrictions or filtering.
