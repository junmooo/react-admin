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
        target: `http://localhost:8088`,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
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
