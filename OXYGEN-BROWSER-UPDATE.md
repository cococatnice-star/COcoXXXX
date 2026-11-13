# Oxygen in-app browser update

The home search field and shortcut buttons now open sites inside Oxygen's browser view instead of launching a separate tab. The browser view includes a tab strip with a `+` button, an address bar, reload and home controls, an external-open fallback, and the persistent bottom dock. Selecting Home returns to the Oxygen home screen.

## Embedding limitation

This update uses a normal iframe for the in-app page area. Websites can prohibit iframe embedding with their own security headers or sign-in policies. Oxygen does not bypass those restrictions. When a site blocks embedding, use the external-open control to visit the site's official URL in a regular browser tab. YouTube videos can be embedded individually when the official YouTube embed URL is used; the full YouTube website may block iframe display.

## Build

From the repository root, install with pnpm and run the existing workspace build:

```sh
pnpm install
pnpm --filter @workspace/cocox-home build
```
