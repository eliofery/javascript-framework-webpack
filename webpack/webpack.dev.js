const { join } = require('path') // работа с путями к файлам и каталогам
const { merge } = require('webpack-merge') // объединяет конфигурации
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // удаляет файлы и каталоги перед каждой сборкой

const common = require('./webpack.common') // общие конфигурации для dev и prod версий

module.exports = merge(common, {
  mode: 'development', // режим разработки
  devtool: 'inline-source-map', // устанавливаем source map для отладки (eval-cheap-module-source-map)
  devServer: {
    // настройки для сервера разработки
    port: 3003, // порт
    hot: true, // вносит изменения в код приложения без перекомпиляции всего проекта
    compress: true, // сжатие данных
    https: true, // использование https
    historyApiFallback: true, // поддержка HTML5 History API
    static: {
      directory: join(__dirname, '../dist'), // указываем путь к статическим файлам
    },
    devMiddleware: {
      // позволяет моментально видеть изменения
      index: true, // автоматически отображение индексного файла
      publicPath: '/', // базовый url для сервера разработки
      writeToDisk: true, // исходные карты и ресурсы будут записаны на диск
    },
    client: {
      logging: 'log', // логи будут отображаться в консоли браузера
    },
    // watchFiles: ['index.html', 'src/**/*.{js,css}'], // следить за изменением определенных файлов
  },
  plugins: [
    // плагины webpack
    new CleanWebpackPlugin({
      // очистка указанных файлов и каталогов перед сборкой
      cleanOnceBeforeBuildPatterns: [join(__dirname, '../dist')],
    }),
  ],
})
