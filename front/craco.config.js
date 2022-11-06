const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A", "@layout-sider-background-light": "#42273B" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
