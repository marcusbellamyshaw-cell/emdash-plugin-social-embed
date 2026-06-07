# emdash-plugin-social-embed

Embed social media posts in [EmDash](https://emdashcms.com) Portable Text by pasting a URL. Fetches embed HTML server-side via oEmbed — no client-side API calls, and platform scripts only load on pages that actually contain that type of embed.

## Supported Platforms

| Platform | Credentials required |
|---|---|
| YouTube | None |
| Vimeo | None |
| Twitter / X | None |
| Spotify | None |
| TikTok | None |

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

## Usage

In any Portable Text field in the EmDash editor, type `/` and choose **Social Embed**, then paste a post URL. The embed is fetched server-side via the plugin's own route — no runtime API calls in the browser.

## Performance

- oEmbed responses are cached at Cloudflare's edge for 24 hours (`cf.cacheTtl`)
- Platform scripts (Twitter widgets.js, TikTok embed.js) are only injected on pages that contain that type of embed
- YouTube, Vimeo, and Spotify produce pure iframes with no extra JavaScript

## License

MIT
