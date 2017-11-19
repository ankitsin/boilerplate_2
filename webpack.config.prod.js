var webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path')

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    app: './Index.jsx',
    lib: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[chunkhash:10].js',
    publicPath: 'http://localhost/'  //TODO modify to http://fecdn.qeebike.com/
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, './node_modules'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&minimize&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:6]!postcss-loader!less-loader')
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, './node_modules'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&minimize&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:6]!postcss-loader')
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './node_modules'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './node_modules'),
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=[name]_[hash:6].[ext]'}
    ]
  },
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions: ['.js', '.jsx','.json']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          autoprefixer({
            browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
          })
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    // The manifest bundle has the code for the webpack runtime
    // https://webpack.js.org/guides/code-splitting-libraries/#manifest-file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor'],
    }),
    new ExtractTextPlugin("[name].[chunkhash:10].css"),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      minify: {},
      template: './index.html'
    })
  ]
}
