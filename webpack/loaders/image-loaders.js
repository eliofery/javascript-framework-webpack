module.exports = [
  {
    loader: 'file-loader', // импорт и обработка файлов
    options: {
      name: '[path][name].[ext]', // имя файла
    },
  },
  {
    loader: 'image-webpack-loader', // оптимизация изображений
    options: {
      mozjpeg: {
        progressive: true,
      },
      optipng: {
        enabled: true,
      },
      pngquant: {
        quality: [0.65, 0.9],
        speed: 4,
      },
      gifsicle: {
        interlaced: false,
      },
      webp: {
        quality: 75,
      },
    },
  },
]
