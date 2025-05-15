import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'en-US',
  title: 'CLI Hub',
  description: 'Your go-to resource for enhanced Linux and DevOps command documentation.',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Commands', link: '/improved-man-pages/' }
    ],

    sidebar: [
      {
        text: 'Core Commands',
        items: [
          { text: 'Overview', link: '/improved-man-pages/' },
          { text: 'awk', link: '/improved-man-pages/awk-improved-man-page.md' },
          { text: 'cat', link: '/improved-man-pages/cat-improved-man-page.md' },
          { text: 'cut', link: '/improved-man-pages/cut-improved-man-page.md' },
          { text: 'find', link: '/improved-man-pages/find-improved-man-page.md' },
          { text: 'grep', link: '/improved-man-pages/grep-improved-man-page.md' },
          { text: 'sed', link: '/improved-man-pages/sed-improved-man-page.md' },
          { text: 'sort', link: '/improved-man-pages/sort-improved-man-page.md' },
          { text: 'tee', link: '/improved-man-pages/tee-improved-man-page.md' },
          { text: 'tmux', link: '/improved-man-pages/tmux-improved-man-page.md' },
          { text: 'top', link: '/improved-man-pages/top-man-page.md' },
          { text: 'tr', link: '/improved-man-pages/tr-improved-man-page.md' },
          { text: 'wc', link: '/improved-man-pages/wc-improved-man-page.md' },
          { text: 'xargs', link: '/improved-man-pages/xargs-improved-man-page.md' },
        ]
      }
    ],

    siteTitle: 'CLI Hub',
    footer: {
      message: 'Enhanced command-line documentation for modern developers.',
      copyright: '© 2024 CLI Hub'
    }
  }
});
