// css loader, sass全局变量
const cssLoaderOptions = {
  loaderOptions: {
    scss: {
      // sass-loader v8
      prependData: `@import "~@/styles/variables.scss";`
    },
  }
}

module.exports = {
  lintOnSave: false,
  css: cssLoaderOptions
}