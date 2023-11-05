import Dispatcher from '@/core/Router/Dispatcher' // родительский класс
import HISTORY_TYPE_ENUM from '@/core/Router/HistoryTypeEnum' // виды роутинга

/**
 * Роутер
 *
 */
export default class Router extends Dispatcher {
  /**
   * Хранит область где будет располагаться разметка страницы
   *
   * @type {null}
   * @protected
   */
  _pageElement = null

  /**
   * Создание роутера
   *
   * @param history - вид роута
   * @param routes - маршруты
   * @returns {*|null}
   */
  static createRoute({ history, routes }) {
    // Получаем объект класса Router
    const router = Router.instance

    // Определяем режим навигации по сайту
    router._history = history ?? router._history

    // Получаем зарегистрированные маршруты
    router._routes.push(...routes)

    // Возвращаем объект класса Router
    return router
  }

  /**
   * Отрисовка готовой страницы
   *
   * @returns {Promise<void>}
   */
  render = async () => {
    // Находим нужный роут и получаем его component,
    // то что прописано при регистрации роутов.
    // Например: component: import('@/pages/ProductPage')
    const { component } = this._findRoute(this.getUri())

    // Если роутер не был найден выводим служебную
    // 404 страницу об ошибке.
    // Для того чтобы выводилась пользовательская страница 404,
    // при перечислении маршрутов в самом конце списка нужно указать:
    // path: '/.*' и component: import('@/pages/ErrorPage').
    // Далее уже в файле ErrorPage описать как будет выглядеть страница об ошибках.
    if (!component) {
      this._page404()

      return
    }

    // Получаем параметры страницы
    const params = this._getParams()

    // Получаем саму страницу
    const page = await this._getComponent(component, params)

    // Если у страницы задан шаблон, то рендерим шаблон.
    if (page.layout) {
      await this._renderLayout(page.layout)
    } else {
      this._pageElement = null
    }

    // Рендерим страницу
    await this._renderPage(page)
  }

  /**
   * Рендер шаблона страницы
   *
   * @param layout - import('@/layouts/MainLayout')
   * @returns {Promise<void>}
   * @protected
   */
  _renderLayout = async layout => {
    // Страница будет содержать путь до шаблона вида import('@/layouts/MainLayout'),
    // при создании объекта этого класса MainLayout нужно взять саму разметку шаблона
    // и разметку его внутренних элементов.
    const { component, elements } = await this._getComponent(layout)

    // Определяем область где будет располагаться разметка страницы
    this._pageElement = elements.page

    // Получаем корневой элемент в который рендерится весь сайт
    const root = document.querySelector(this.root)

    // Очищаем старое содержимое
    root.innerHTML = ''

    // Рендерим новое
    root.insertAdjacentElement('afterbegin', component)
  }

  /**
   * Рендер страницы
   *
   * @param component
   * @returns {Promise<void>}
   * @protected
   */
  _renderPage = async ({ component }) => {
    // Получаем корневой элемент в который рендерится весь сайт
    let root = document.querySelector(this._root)

    // Если у страницы был найден шаблон, то рендерить нужно только саму страницу,
    // так как шаблон уже добавлен на страницу сайта
    if (this._pageElement) {
      root = this._pageElement
    }

    // Очищаем старое содержимое
    root.innerHTML = ''

    // Рендерим новое
    root.insertAdjacentElement('afterbegin', component)

    // Очищаем область где будет располагаться разметка страницы
    this._pageElement = null
  }

  /**
   * Базовая страница 404
   *
   * @protected
   */
  _page404() {
    document.querySelector(this._root).innerHTML = 'Страница 404 не найдена'
  }

  /**
   * Получение текущей ссылки
   *
   * @returns {string}
   */
  getUri() {
    // Ссылка будет форматирована согласно выбранному режиму
    if (this._history === HISTORY_TYPE_ENUM.STATE) {
      return this._strippedPath()
    }

    return this._strippedHashPath()
  }

  /**
   * Получение параметров из ссылки
   *
   * Пример: /foo/1/bar/2 => { foo: 1, bar: 2 }
   *
   * @returns {{}}
   * @protected
   */
  _getParams() {
    return this.getUri()
      .slice(1)
      .split('/')
      .reduce((acc, item, index, array) => {
        if (index % 2 === 0 && array[index + 1]) {
          acc[item] = array[index + 1]
        }

        return acc
      }, {})
  }

  /**
   * Поиск текущего роута
   *
   * @param route
   * @returns {*}
   * @protected
   */
  _findRoute(route) {
    return this._routes.find(item => {
      const regex = new RegExp(`^${item.path}$`)

      return route.match(regex)
    })
  }

  /**
   * Получение шаблона или страницы
   *
   * @param component - import('@/foo/bar')
   * @param params - { foo: 1, bar: 2 }
   * @returns {Promise<*>}
   * @protected
   */
  async _getComponent(component, params = {}) {
    let Component = component

    // Так как компонент страницы может быть передан как динамически так и нет,
    // то мы должны проверить при динамическом импорте мы получим Promise
    if (Component instanceof Promise) {
      const module = await Component

      Component = module.default
    }

    return new Component({
      ...params,
      router: this,
    })
  }
}
