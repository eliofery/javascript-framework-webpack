import Router from '@/core/Router/Router' // роутер фрейморка

/**
 * Регистрация роутов
 *
 * @type {*|null}
 */
const router = Router.createRoute({
  // Вид роутинга, в рамках фреймворка будут реализованы
  // два вида:
  // createWebHistory - стандартный роутинг, вида /foo/bar
  // createWebHashHistory - роутинг с хэшем, вида /#/foo/bar
  history: Router.createWebHistory(),

  // Список роутов
  // Здесь мы используем динамический импорт для улучшения производительности
  routes: [
    {
      path: '/', // ссылка на главную страницу
      component: import('@/pages/HomePage'), // класс отвечающий за отображение главной страницы
    },
    {
      path: '/about',
      component: import('@/pages/AboutPage'),
    },
    {
      path: '/.*', // 404 страница
      component: import('@/pages/ErrorPage'), // класс отвечающий за отображение 404 страницы
    },
  ],
})

export default router
