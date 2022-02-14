var link = "http://localhost:8080/onlinechat/user"
module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  outputDir: 'dist',
  devServer: {
    proxy: {
    "^/assets": {
        target: link,
        pathRewrite: { "^/passports/": "/passports/" },
        changeOrigin: true,
        logLevel: "debug"
      },
      // End userllllllllllllll
      "^/user": {
        target: link,
        pathRewrite: { "^/user/": "/user/" },
        changeOrigin: true,
        logLevel: "debug"
      },
      "^/pub": {
        target: link,
        pathRewrite: { "^/pub/": "/pub/" },
        changeOrigin: true,
        logLevel: "debug"
      },

    }
  }
};