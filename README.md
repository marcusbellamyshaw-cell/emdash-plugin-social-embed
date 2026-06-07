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
| Facebook | Meta App (see below) |
| Threads | Meta App (see below) |
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

Get your App ID and Secret from [developers.facebook.com](https://developers.facebook.com). Enable the **oEmbed** product on your app.

Add to `.dev.vars` (local) and `wrangler.jsonc` `[vars]` section (production):

```
SOCIAL_EMBED_META_APP_ID=your_app_id
SOCIAL_EMBED_META_APP_SECRET=your_app_secret
```

## Usage

In any Portable Text field in the EmDash editor, type `/` and choose **Social Embed**, then paste a post URL. The embed is fetched server-side and rendered as static HTML — no runtime API calls on the deployed site.

## Performance

- oEmbed responses are cached at Cloudflare's edge for 24 hours
- Platform scripts (Twitter widgets.js, TikTok embed.js, Facebook SDK) are only injected on pages that contain that type of embed
- YouTube, Vimeo, Reddit, Spotify, and Bluesky produce pure iframes with no extra JavaScript at all

## License

MIT
