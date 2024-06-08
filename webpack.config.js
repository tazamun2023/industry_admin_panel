const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin([{
        from: './node_modules/@pdftron/webviewer/public',
        to: './dist/public/webviewer'
      }]
    ),
  ],
  module: {
    loaders: [

      // ...

      // Css loader.
      {
        test: /\.css$/,
        loader: 'vue-style-loader!css-loader'
      }

    ]
  },
  vue: {
    loaders: {

      // ...

      // Css loader for Webpack 1.x .
      css: 'vue-style-loader!css-loader'
    }
  }
};
