var webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  DashboardPlugin = require('webpack-dashboard/plugin'),
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
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre', // run before the build process
        test: /(\.js$|\.jsx$)/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true
        }
      },
      {
        test: /\.less$/,
        exclude: path.resolve(__dirname, './node_modules'),
        loader: 'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:6]!postcss-loader!less-loader'
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, './node_modules'),
        loader: 'style-loader!css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]__[hash:base64:6]!postcss-loader'
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, './node_modules'),
        loader: 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './node_modules'),
        loader: 'style-loader!css-loader!postcss-loader'
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
    new DashboardPlugin(),
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
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  devServer: {
    stats: { chunks:false },
    contentBase: './src',
    hot: true,
    port: 6060
  }
}
