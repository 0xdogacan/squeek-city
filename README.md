# Squeek City
A shared city builder powered by Squeekchain’s live hamster wheel.

## Vercel environment variables
Attach Upstash Redis and ensure one of these pairs exists:
- `STORAGE_URL` / `STORAGE_TOKEN`
- `STORAGE_KV_REST_API_URL` / `STORAGE_KV_REST_API_TOKEN`

No wallet private keys are ever requested. Wallet sign-in uses a no-gas signature.

## Product rules
- City score, buildings and leaderboards are backend-authoritative.
- Squeekchain telemetry is read in the browser for live ambience/events.
- No automated server polling or Cloudflare bypass is used.
