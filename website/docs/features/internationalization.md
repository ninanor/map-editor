---
sidebar_label: Internationalization
sidebar_position: 6
---

# Internationalization

NINA Maps uses [i18next](https://www.i18next.com/) with [react-i18next](https://react.i18next.com/) to support multiple languages. Translations are loaded lazily over HTTP so only the required language file is downloaded.

## Supported languages

| Code | Language |
|---|---|
| `en` | English |
| `no` | Norwegian (Bokmål) |

## Switching language

The active language is stored in `MapSettings.language` inside the map configuration. A user can change it from the **Settings** page in the editor. The change takes effect immediately without a page reload.

## Translation files

Translation strings are plain JSON files located under `public/locales/`:

```
public/locales/
├── en/
│   └── translation.json
└── no/
    └── translation.json
```

## Adding a new language

1. Create `public/locales/<code>/translation.json` using an existing file as a template.
2. Add the new language code to the i18next configuration in `src/i18n.ts`.
3. Add it as an option in the language selector in `src/components/forms/SettingsForm.tsx`.

## Translation key categories

The translation files cover:

- Viewer UI labels (`layers`, `legend`, `basemap`, `description`)
- Editor actions (`add-folder`, `add-layer`, `edit-layer`, `update`, `delete`)
- Layer form field labels (`tile-url`, `source-layer`, `colormap-name`, `rescale`, …)
- Legend type labels (`linear`, `interval`, `image`)
- Settings labels (`theme`, `language`, `titiler-url`, `exclusive-layers`)
- Status messages (`config-loaded-success`, `config-load-error`, `features-found`)
