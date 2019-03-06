const fs = require('fs')
const path = require('path')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const pkg = require('./package')

// Generate categories

const appDir = path.join('pages', 'app')
const categories = fs
  .readdirSync(appDir, { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(item => {
    const category = item.name
    const apps = fs.readdirSync(path.join(appDir, category))

    return {
      name: category,
      apps: apps.map(app => {
        const name = app.substr(0, app.lastIndexOf('.vue'))
        const url = `app/${category}/${name}`
        return {
          name: name.replace('-', ' '),
          path: url
        }
      })
    }
  })
const categoriesJSON = JSON.stringify(categories)
fs.writeFileSync(path.join('assets', 'data', 'categories.json'), categoriesJSON)

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/search',
    { src: '@/plugins/plots', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa'],

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
