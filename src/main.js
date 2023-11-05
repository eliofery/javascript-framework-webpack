import router from '@/routers' // роутер приложения
import App from '@/core/App' // для инициализации приложения

import '@/assets/scss/global.scss' // глобальные стили приложения

const app = new App(router) // создаем приложение

app.run() // инициализируем приложение
