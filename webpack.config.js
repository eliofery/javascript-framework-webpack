const { resolve } = require('path') // работа с путями к файлам и каталогам

module.exports = {
  resolve: {
    extensions: ['.js'],

    // короткий путь до js файлов через символ @, например @/components/ButtonComponent
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}
