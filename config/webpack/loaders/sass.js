const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {env} = require('../configuration.js')

module.exports = {
  test: /\.(sc|sa|c)ss$/i,
  use: [
    env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
    {loader: 'css-loader', options: {minimize: env.NODE_ENV === 'production'}},
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      },
    },
    'resolve-url-loader',
    {loader: 'sass-loader', options: {sourceMap: true}},
  ],
}
