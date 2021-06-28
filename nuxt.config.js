export default {
  generate: {
    dir: '../templates',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '白州の値段を捏造するサイト',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '白州の値段を捏造するサイトです。',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://hakushu-price-generator.herokuapp.com/',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: '白州の値段を捏造するサイト',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '白州の値段を捏造するサイトです。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://hakushu-price-generator.herokuapp.com/_nuxt/img.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@ganja_tuber' },
      {
        name: 'google-site-verification',
        content: 'CLC5e-Xbw3EfkpFkL62hjHm3nXoH1Re6MF_FN2dsP-4',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
