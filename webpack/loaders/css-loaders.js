const MiniCssExtractPlugin = require('mini-css-extract-plugin') // извлекать css из js

const devMode = process.env.NODE_ENV === 'development' // определение окружения

module.exports = [
  devMode ? { loader: 'style-loader' } : { loader: MiniCssExtractPlugin.loader }, // инлайн стили или стили в отдельный файл
  { loader: 'css-loader' }, // поддержка css файлов
  { loader: 'postcss-loader' }, // автопрефиксер и другие улучшения
  { loader: 'sass-loader' }, // поддержка scss файлов
]
