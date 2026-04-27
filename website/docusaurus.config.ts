import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'NINA Maps',
  tagline: 'A React-based interactive map viewer and editor for geospatial data',
  favicon: 'img/favicon.ico',

  url: 'https://ninanor.github.io',
  baseUrl: '/nina-maps/',

  organizationName: 'ninanor',
  projectName: 'nina-maps',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'NINA Maps',
      logo: {
        alt: 'NINA Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/ninanor/nina-maps',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Setup', to: '/setup' },
            { label: 'Features', to: '/features' },
            { label: 'Configuration', to: '/configuration' },
            { label: 'Editor Guide', to: '/editor' },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Norwegian Institute for Nature Research',
              href: 'https://www.nina.no',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ninanor/nina-maps',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Norwegian Institute for Nature Research (NINA). Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['json', 'bash', 'typescript', 'docker'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
