/* craco.config.js */
const path = require("path");
const CracoLessPlugin = require("craco-less");

module.exports = {
  webpack: {
    alias: {
      "@": path.join(__dirname, "./src"),
    },
  },
  devServer: {
    // https: true,
    proxy: {
      "/api": {
        target: `https://uatapp02.easyhro.com`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  typescript: {
    enableTypeChecking: true /* (default value) */,
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
    },
  ],
  babel: {},
};
