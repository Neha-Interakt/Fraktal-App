const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_DIR = path.resolve(__dirname);
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'web-build'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          APP_DIR,
          /node_modules\/(react-native-|@react-native|@react-navigation|react-native$)/,
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { browsers: 'last 2 versions' }, modules: false }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', { helpers: true, regenerator: true }],
              ['module-resolver', {
                root: [SRC_DIR],
                alias: {
                  '@': APP_DIR,
                  '@src': SRC_DIR,
                  '@components': `${SRC_DIR}/components`,
                  '@screens': `${SRC_DIR}/screens`,
                  '@navigation': `${SRC_DIR}/navigation`,
                  '@services': `${SRC_DIR}/services`,
                  '@context': `${SRC_DIR}/context`,
                  '@constants': `${SRC_DIR}/constants`,
                  '@hooks': `${SRC_DIR}/hooks`,
                  '@types': `${SRC_DIR}/types`,
                  '@data': `${SRC_DIR}/data`,
                },
              }],
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
      'react-native-linear-gradient': path.resolve(__dirname, 'src/shims/LinearGradient.web.tsx'),
      'react-native-keychain': path.resolve(__dirname, 'src/shims/Keychain.web.ts'),
      '@': APP_DIR,
      '@src': SRC_DIR,
      '@components': path.resolve(SRC_DIR, 'components'),
      '@screens': path.resolve(SRC_DIR, 'screens'),
      '@navigation': path.resolve(SRC_DIR, 'navigation'),
      '@services': path.resolve(SRC_DIR, 'services'),
      '@context': path.resolve(SRC_DIR, 'context'),
      '@constants': path.resolve(SRC_DIR, 'constants'),
      '@hooks': path.resolve(SRC_DIR, 'hooks'),
      '@types': path.resolve(SRC_DIR, 'types'),
      '@data': path.resolve(SRC_DIR, 'data'),
    },
    extensions: [
      '.web.tsx', '.web.ts', '.web.jsx', '.web.js',
      '.tsx', '.ts', '.jsx', '.js',
    ],
    fallback: {
      crypto: false,
      path: false,
      fs: false,
      buffer: false,
      stream: false,
      vm: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      inject: true,
    }),
  ],
  devServer: {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    compress: true,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
};
