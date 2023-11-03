const { join, resolve } = require('path') // работа с путями к файлам и каталогам
const globAll = require('glob-all') // операции над файлами
const { merge } = require('webpack-merge') // объединяет конфигурации

const TerserPlugin = require('terser-webpack-plugin') // выполняет минимизацию и оптимизацию js
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin') // удаляет неиспользуемые css стили

const common = require('./webpack.common') // общие конфигурации для dev и prod версий

module.exports = merge(common, {
  mode: 'production', // режим production
  output: {
    // исходная точка
    publicPath: '/', // публичный путь для доступа к выходным файлам
    path: resolve(__dirname, '../build'), // устанавливает путь для сохранения собранного кода
    filename: 'js/[name].[contenthash].js', // настройка имени собранного файла с хэшем содержимого
    clean: true, // очистка каталога сборки перед каждой новой сборкой
  },
  optimization: {
    // настройки для оптимизации сборки
    minimizer: [
      new TerserPlugin({
        parallel: true, // параллельная минимизация для ускорения сборки
        extractComments: false, // не извлекать комментарии из сжатого кода
        terserOptions: {
          format: {
            comments: false, // не сохранять комментарии
          },
        },
      }),
    ],
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: globAll.sync(join(__dirname, '../src/**/*.js'), { nodir: true }), // пути к js файлам для анализа стилей
    }),
  ],
})
