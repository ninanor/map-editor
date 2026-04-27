---
id: editor
sidebar_position: 1
---

# Editor Guide

The editor is a browser-based configuration interface that lets you build and modify maps without editing JSON by hand. It is available at `/editor` and can be disabled by setting `VITE_HIDE_EDIT_BUTTON=true` at build time.

## Accessing the editor

From any map view, click the **Edit** button in the top-right header. This opens the editor pre-loaded with the current map's configuration.

The editor uses the same map configuration format described in the [Configuration Reference](/configuration). Every change you make in the editor is stored in the [Zustand](https://zustand-demo.pmnd.rs/) in-memory store and reflected on the preview map immediately.

## Editor layout

The editor has two panels side by side:

| Panel | Content |
|---|---|
| **Left** | Navigation tabs and edit forms |
| **Right** | Live map preview |

A **Navbar** at the top lets you switch between **Edit** and **Preview** modes. In Preview mode the sidebar shows the viewer tabs (Layers, Legend, Basemap, Description) as end users see them.

## Editor tabs

| Tab | Route | Purpose |
|---|---|---|
| Layers | `/editor/edit` | Browse and reorder the layer/folder tree |
| Description | `/editor/edit/description` | Edit map title, subtitle, icon, description |
| Manage | `/editor/edit/manage` | Drag-reorder active layers |
| Settings | `/editor/edit/settings` | Configure TiTiler URL, theme, language, etc. |
