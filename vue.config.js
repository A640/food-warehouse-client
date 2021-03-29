const path = require('path');


module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: process.env.OUTPUT_DIR,
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  chainWebpack: config => {
    const vuexStorePath = process.env.VUE_APP_STORE // path to vuex store (production or demo)
    config.resolve.alias.set(
      'store-path',
      path.resolve(__dirname, `src/${vuexStorePath}`)
    )
  }
}