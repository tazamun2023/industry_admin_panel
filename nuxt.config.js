const configJson = require('./jsconfig.json')

const isDemo = process.env.IS_DEMO === 'true'
const domain = process.env.domain
let apiBase = !process.env.API_BASE.trim() ? '/' : process.env.API_BASE
apiBase += configJson.api.url

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  /*  target: 'static',*/
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Index',
    htmlAttrs: {
      lang: 'en',
      dir: 'ltr',
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ]
  },
  transition: {
    css: false
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vue-select/dist/vue-select.css',
    'vue2-datepicker/index.css',
    '@kouts/vue-modal/dist/vue-modal.css',
    '~/assets/css/tailwind.css',
    '~/assets/styles/styles.styl'
  ],
  env: {
    apiBase: process.env.API_BASE,
    frontBase: process.env.Front_BASE,
    isDemo: isDemo,
    PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
    PUSHER_APP_CLUSTER: process.env.PUSHER_APP_CLUSTER
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-ellipse-progress.js'},
    {src: '~/plugins/directives.js'},
    {src: '~/plugins/tippy.js'},
    {src: '~/plugins/lodash.js'},
    // { src: '~/plugins/froala_editor.js', mode: 'client', ssr: false },
    {src: '~/plugins/vue-modal.js', mode: 'client'},
    {src: '~/plugins/vue-draggable', ssr: false},
    {src: '~/plugins/vue-select.js', ssr: false},
    {src: '~/plugins/vue-datepicker.js', ssr: false},
    {src: '@/plugins/i18n.js'},
    {src: '@/plugins/vue-html2pdf', mode: 'client'},
    {src: '@/plugins/google-map.js', mode: 'client'},
    {src: '@/plugins/ability.js'},
    {src: '~/plugins/cryptojs.js', mode: 'client'},
    // global-component
    {src: '~/plugins/global-component.js', ssr: false},
    {src: '@/plugins/casl.js'},
    {src: '~/plugins/dompurify.js'},
    {src: '~/plugins/nuxt-client-init.js', ssr: false},
    {src: '~/plugins/vee-validate.js', ssr: false}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-sweetalert2',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    '~/modules/froala'
  ],
  router: {
    base: process.env.ADMIN_FOLDER
  },
  auth: {
    namespace: 'admin_panel',
    redirect: {
      logout: '/login',
      callback: false,
      home: false,
    },
    cookie: {
      domain: domain,
      options: {

        expires: new Date(new Date().getTime() + 20000000000).getTime(), //thats today + a year
        maxAge: 31622400
      },

      //options: {
      //maxAge: 31622400
      // },
      prefix: 'frontend_',

    },
    localStorage: false,
    strategies: {
      local: {
        token: {
          global: true,
          property: 'data.token',
          //maxAge: 60 * 60 * 4, // 4 hours
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: 'data',
          autoFetch: false
        },
        endpoints: {
          login: {url: apiBase + configJson.api.login, method: 'post'},
          logout: {url: apiBase + configJson.api.logout, method: 'get'},
          // user: false
          user: {url: apiBase + configJson.api.profile, method: 'get'}
        }
      }
    }
  },

  i18n: {
    seo: true,
    localeDetection: false,
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        iso: 'en',
        dir: 'ltr'
      },
      {
        code: 'fr',
        file: 'fr.json'
      },
      {
        code: 'ar',
        name: 'العربية',
        file: 'ar.json',
        iso: 'ar',
        dir: 'rtl'
      },
      {
        code: 'tr',
        file: 'tr.json'
      },
      {
        code: 'hi',
        file: 'hi.json'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected'
    },
    lazy: false,
    langDir: 'lang/',
    defaultLocale: 'en'
  },

  build: {
    // Add exception
    transpile: [
      "vee-validate/dist/rules", /^vue2-google-maps($|\/)/
    ],
    /*
      ** You can extend webpack config here
      */
    extend(config, ctx) {
      // ...
    }
  }
  // Build Configuration: https://go.nuxtjs.dev/config-build
  /*  build: {
      extractCSS: false,
      splitChunks: {
        layouts: false,
        pages: true,
        commons: true
      },
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '.',
          name: true,
          cacheGroups: {}
        }
      }
    }*/
}
