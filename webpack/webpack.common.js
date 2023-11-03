const { join } = require('path') // работа с путями к файлам и каталогам
const webpack = require('webpack') // ядро webpack
const { merge } = require('webpack-merge') // объединяет конфигурации

const HtmlWebpackPlugin = require('html-webpack-plugin') // динамически встраивает данные в html
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // сохраняет css и js в отдельные файлы
const CopyWebpackPlugin = require('copy-webpack-plugin') // копирует файлы и директории из одного места в другое
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack') // создает svg спрайт

const jsLoaders = require('./loaders/js-loaders') // обработка js
const cssLoaders = require('./loaders/css-loaders') // обработка стилей
const imageLoaders = require('./loaders/image-loaders') // обработка изображений
const fontLoaders = require('./loaders/font-loaders') // обработка шрифтов

const webpackBase = require('../webpack.config') // базовый конфигурационный файл

// загрузка переменных окружения
require('dotenv').config({
  path: `${process.env.NODE_ENV}.env`,
})

module.exports = merge(webpackBase, {
  target: 'web', // целевая среду сборки браузер
  entry: {
    // входная точка
    app: join(__dirname, '../src/main.js'), // основной JavaScript файл приложения
  },
  output: {
    // исходная точка
    publicPath: '/', // публичный путь для доступа к выходным файлам
    path: join(__dirname, '../dist'), // директория для сохранения собранных файлов
    filename: 'js/[name].bundle.js', // имя выходного файла с динамическими именами [name]
    chunkFilename: 'js/[name]-[id].js', // имя файлов чанков с динамическими именами [name]-[id]
    clean: true, // очистка выходной директории перед каждой сборкой
  },
  module: {
    // дополнительные модули для обработки файлов
    rules: [
      // правило для обработки изображений
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: imageLoaders,
      },

      // {
      //   test: /\.svg$/,
      //   use: SvgSpriteHtmlWebpackPlugin.getLoader(),
      //   exclude: /node_modules/,
      // },

      // встроенные ресурсы
      // background: url("@/assets/icons/icon-blank.svg")
      {
        test: /\.svg$/,
        type: 'asset/inline',
        resourceQuery: /inline/,
      },

      // правило для обработки шрифтов
      {
        test: /\.(woff2)$/i,
        use: fontLoaders,
      },

      // правило для обработки css модулей
      {
        test: /\.(sa|sc|c)ss$/i,
        use: cssLoaders.map(item => {
          const clone = { ...item }

          if (clone.loader === 'css-loader') {
            clone.options = {
              modules: true, // включение CSS модулей для css-loader
            }
          }

          return clone
        }),
        include: /\.module\.css$/, // применяется только к файлам с расширением .module.css
      },

      // правило для обработки стилей
      {
        test: /\.(sa|sc|c)ss$/i,
        use: cssLoaders,
        exclude: /\.module\.css$/, // исключение файлов с расширением .module.css.
      },

      // правило для обработки скриптов
      {
        test: /\.m?js$/i,
        use: jsLoaders,
        exclude: /node_modules/, // исключение файлов из node_modules
      },
    ],
  },
  plugins: [
    // плагины webpack
    // определение переменных окружения
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),

    // создание HTML файла на основе шаблона
    new HtmlWebpackPlugin({
      filename: 'index.html', // имя HTML файла
      template: join(__dirname, '../src/index.html'), // шаблон основного index.html файла
    }),

    // извлечение стилей в отдельные CSS файлы
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // имя CSS файла
      chunkFilename: 'css/[id].css', // имя файлов чанков стилей
    }),

    // svg спрайт
    // <svg> <use xlink:href="#icon-test"></use> </svg>
    new SvgSpriteHtmlWebpackPlugin({
      append: false, // вставить спрайт вначале <body> для false
      includeFiles: [
        'src/assets/icons/*.svg', // подключаемые в спрайт файлы
      ],
    }),

    // копирование файлов и ресурсов
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(__dirname, '../src/assets'), // откуда копировать
          to: 'assets/[path][name][ext]', // куда копировать
          noErrorOnMissing: true, // не генерировать ошибки при отсутствии файлов
        },
      ],
    }),
  ],
})
