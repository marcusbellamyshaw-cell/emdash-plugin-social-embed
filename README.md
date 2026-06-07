# emdash-plugin-social-embed

Embed social media posts in [EmDash](https://emdashcms.com) Portable Text by pasting a URL. Fetches embed HTML server-side via oEmbed — no client-side API calls, and platform scripts only load on pages that actually contain that type of embed.

## Supported Platforms

| Platform | Credentials required |
|---|---|
| YouTube | None |
| Vimeo | None |
| Twitter / X | None |
| Reddit | None |
| Spotify | None |
| Bluesky | None |
| TikTok | None |
| Facebook | Meta App (configure in admin) |
| Threads | Meta App (configure in admin) |
| Mastodon | None (best-effort per instance) |

## Installation

```bash
npm install emdash-plugin-social-embed
```

Register in `astro.config.mjs`:

```js
import { socialEmbedPlugin } from "emdash-plugin-social-embed";

emdash({
  plugins: [socialEmbedPlugin()],
})
```

> **Note:** This is a native (trusted) plugin. It must be added to `plugins: []`, not `sandboxed: []`. This is required because it ships Astro components for server-side rendering.

## Facebook & Threads

Configure credentials through the EmDash admin UI — no env vars or config files needed:

1. Create an app at [developers.facebook.com](https://developers.facebook.com) and enable the **oEmbed** product.
2. In the EmDash admin, go to **Settings → Social Embed** and enter your App ID and App Secret.

Credentials are stored in the plugin's scoped KV store and read at render time.

## Usage

In any Portable Text field in the EmDash editor, type `/` and choose **Social Embed**, then paste a post URL. The embed is fetched server-side via the plugin's own route — no runtime API calls in the browser.

## Performance

- oEmbed responses are cached at Cloudflare's edge for 24 hours (`cf.cacheTtl`)
- Platform scripts (Twitter widgets.js, TikTok embed.js, Facebook SDK) are only injected on pages that contain that type of embed
- YouTube, Vimeo, Reddit, Spotify, and Bluesky produce pure iframes with no extra JavaScript at all

## License

MIT
