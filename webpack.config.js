const webpack = require('webpack');
const path = require('path');
const awesomeTsLoader = require('awesome-typescript-loader');

const sourcePath = path.join(__dirname, './client');
const distPath = path.join(__dirname, './dist');
const embedFileSize = 65536;

module.exports = function (env) {
  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  return {
    context: sourcePath,
    entry: {
      app: './index.tsx'
    },
    output: {
      publicPath: '/',
      path: distPath,
      filename: '[name].bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          include: /client/,
          exclude: /node_modules/,
          use: [
            'awesome-typescript-loader'
          ],
        },
        {
          test: /\.svg.*$/,
          use: ['url-loader']
        },
        {
          test: /\.(otf|eot|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: ['url-loader']
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.ts', '.tsx', '.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath
      ],
      alias: {
        'react': 'preact-compat',
        'react-dom': 'preact-compat'
      }
    },

    plugins: [
      new awesomeTsLoader.CheckerPlugin(),
    ],
    performance: isProd && {
      maxAssetSize: 100,
      maxEntrypointSize: 300,
      hints: 'warning',
    },
    devtool: 'source-map',

    stats: {
      colors: {
        green: '\u001b[32m',
      }
    },

    devServer: {
      contentBase: './client',
      historyApiFallback: true,
      // port: 3000,
      // compress: isProd,
      // stats: {
      //   assets: true,
      //   children: false,
      //   chunks: false,
      //   hash: false,
      //   modules: false,
      //   publicPath: false,
      //   timings: true,
      //   version: false,
      //   warnings: true,
      //   colors: {
      //     green: '\u001b[32m',
      //   }
      // },
    }
  };
};
