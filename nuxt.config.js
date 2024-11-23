export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Pronunciation Application',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  // set this for serverside Project
  target : 'server',
  ssr: true,
  buildDir: '.output',

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/tailwind.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/pwa'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  generate: {
    fallback: true, // For static hosting fallback
  },
  pwa: {
    manifest: {
      name: 'Pronunciation University',
      short_name: 'PWA',
      theme_color: '#ffffff',
      lang: 'en',
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      display: 'standalone',
      start_url: '/',
      screenshots: [
        {
          src: '/screenshot-mobile.png',
          sizes: '1080x1920',
          type: 'image/png',
        },
        {
          src: '/screenshot-desktop.png',
          sizes: '1920x1080',
          type: 'image/png',
          form_factor: 'wide', // This is required
        },
      ],
      workbox: {
        offline: true,
        runtimeCaching: [
          {
            urlPattern: 'https://pronunciation-university.vercel.app/',
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'api-cache',
            },
          },
        ],
      },
    },
  },
}
