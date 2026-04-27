---
sidebar_label: Map Settings
sidebar_position: 4
---

# Map Settings

## Description & Metadata

Navigate to **Description** (`/editor/edit/description`) to edit the top-level map metadata:

| Field | Description |
|---|---|
| **Title** | Main heading shown in the header and on the home page |
| **Subtitle** | Short description below the title |
| **Icon URL** | URL to an image displayed next to the title. A preview is shown as you type. |
| **Description** | Full MDX-formatted description rendered in the Description tab. Supports Markdown, links, and embedded React components. |

Click **Save** to apply changes.

---

## Layer draw order

Navigate to **Manage** (`/editor/edit/manage`) to control which layers are active and in what order they are drawn.

This page shows only the layers currently in `layerOrder` (i.e. visible layers). Use drag-and-drop to reorder them. Layers higher in the list are drawn on top of layers lower in the list.

To add a layer to the draw order, toggle its visibility in the layer tree. To remove it, toggle it off.

---

## Application Settings

Navigate to **Settings** (`/editor/edit/settings`) to configure application-level options:

| Setting | Description |
|---|---|
| **TiTiler API URL** | Base URL for the TiTiler service. Use `/titiler` when running the Docker stack, or a full URL for a remote instance. Required for COG. |
| **Theme** | Visual theme of the application. Supports all [DaisyUI](https://daisyui.com/docs/themes/) themes (35+ options including `light`, `dark`, `cupcake`, `forest`, `aqua`, …). |
| **Language** | Interface language: `en` (English) or `no` (Norwegian). |
| **Menu orientation** | `vertical` — default sidebar layout; `horizontal` — tabs shown at the top of the sidebar. |
| **Exclusive layers** | When enabled, activating one layer automatically deactivates all others. Useful for thematic maps. |

### Loading & saving configurations

The Settings page also provides utilities for managing the configuration file:

- **Upload config** — load a `config.json` file from your local disk. This replaces the entire in-memory configuration.
- **Download config** — export the current configuration as a `config.json` file to your local disk.
- **Load from URL** — fetch a configuration from an external URL and apply it. Useful for loading a pre-existing config from a remote server.

:::tip
Always use **Download config** before making large structural changes so you have a backup to restore from.
:::
