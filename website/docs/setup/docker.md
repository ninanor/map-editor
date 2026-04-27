---
sidebar_label: Docker Deployment
sidebar_position: 2
---

# Docker Deployment

NINA Maps ships with a multi-stage `Dockerfile` and a `docker-compose.yml` that starts the application together with [TiTiler](https://developmentseed.org/titiler/) (for raster processing) and Redis (caching).

## Services

| Service | Image | Port | Purpose |
|---|---|---|---|
| `app` | Custom Node 24-alpine build | 5173 (dev) / 80 (prod) | NINA Maps frontend |
| `titiler` | `ghcr.io/developmentseed/titiler` | 8989 | Cloud-Optimized GeoTIFF tile server |
| `redis` | `redis:alpine` | 6379 | TiTiler caching layer |

## Quick start

```bash
docker compose up
```

This builds the application image and starts all three services. The app is available at `http://localhost`.

## Dockerfile stages

The `Dockerfile` uses a multi-stage build to keep the final image small:

| Stage | Purpose |
|---|---|
| `prod-deps` | Install only production Node dependencies |
| `build` | Run `pnpm build` (TypeScript check + Vite bundle) |
| `frontend` | Development server on port 5173 |
| Final | Nginx serving the static bundle |

## Runtime configuration

At runtime the container reads `public/config.js`, which is mounted as a volume or baked into the image. This file exposes settings to the browser without requiring a rebuild:

```js
// config.js
window.config = {
  // Override the default maps directory URL
  defaultConfiguration: "/maps",
  // Optionally hide the editor button
  hideEditButton: false,
};
```

Copy `config.js.example` to `public/config.js` and customise it for your deployment.

## Nginx

The `nginx/default.conf.template` configures Nginx to:

- Serve the Vite bundle from the document root
- Proxy `/titiler` requests to the TiTiler service
- Return `index.html` for all non-asset paths (SPA fallback)

The template is processed by `envsubst` at container start, so environment variables set in `docker-compose.yml` are substituted automatically.

## Environment variables (Docker)

| Variable | Description |
|---|---|
| `TITILER_API_CORS_ORIGINS` | CORS origins allowed by TiTiler (`*` for open access) |
| `VITE_DEFAULT_CONFIGURATION` | Build-time path prefix for map configs |
| `VITE_HIDE_EDIT_BUTTON` | Build-time flag to disable the editor button |
