import Router from '@/core/Router/Router' // роутер
import BaseComponent from '@/core/BaseComponent' // базовый компонент

/**
 * Ссылка на внутренние страницы приложения
 */
export default class Link extends BaseComponent {
  /**
   * Список всех проинициализированных ссылок
   *
   * @type {[]}
   * @protected
   */
  static _links = []

  /**
   * Создание ссылки
   *
   * @param url
   * @param html
   * @param attributes
   * @param activeClass
   */
  constructor({ url = '', html = '', attributes = {}, activeClass = 'active' } = {}) {
    super()

    this._router = Router.instance // роутер

    this._url = this._correctUrl(url) // ссылка
    this._html = html // содержимое ссылки
    this._attributes = attributes // атрибуты ссылки
    this._activeClass = activeClass // класс активной ссылки

    this._init() // инициализация компонента Link
  }

  /**
   * Получение роутера
   *
   * @returns {Router.instance}
   */
  get router() {
    return this._router
  }

  /**
   * Получение активного класса
   *
   * @returns {string}
   */
  get activeClass() {
    return this._activeClass
  }

  /**
   * Исправление ссылки для ссылки вида хэш
   *
   * @param url
   * @returns {*}
   * @protected
   */
  _correctUrl(url) {
    if (this._router.history === Router.createWebHashHistory()) {
      url = url.replace(/^\//, '/#/') // меняет / -> /#/
    }

    return url
  }

  /**
   * Инициализация компонента
   *
   * @protected
   */
  _initComponent() {
    // Создаем элемент ссылка
    this._component = document.createElement('a')

    // Если урл ссылки соответствует урл в браузере делаем ссылку активной
    if (this._url === this._router.getUri()) {
      this._component.classList.add(this._activeClass)
    }

    // Добавляем урл в ссылку
    this._component.setAttribute('href', this._url)

    // Добавляем содержимое в ссылку
    this._component.innerHTML = this._html

    // Добавляем аттрибуты ссылки
    Object.entries(this._attributes).forEach(([prop, value]) => {
      this._component.setAttribute(prop, `${value}`)
    })

    // Аккумулируем все ссылки
    Link._links.push({
      link: this._component,
      activeClass: this._activeClass,
    })
  }

  /**
   * Прослушка событий
   *
   * @protected
   */
  _initListeners() {
    this._component.addEventListener('click', async evt => {
      // Отменяем стандартный переход по ссылки
      evt.preventDefault()

      // Получаем урл ссылки
      const path = evt.currentTarget.getAttribute('href')

      // Меняем урл в браузере на урл ссылки
      window.history.pushState(null, null, path)

      // Переключаем классы у активных ссылок
      this._toggleClass()

      // Рендарим страницу
      await this._router.render()
    })

    // Переключаем классы у активных ссылок при изменении страницы
    window.addEventListener(this._router.history, () => this._toggleClass(), {
      signal: this._abortController.signal,
    })
  }

  /**
   * Переключаем классы у активных ссылок
   *
   * @protected
   */
  _toggleClass() {
    Link._links.forEach(({ link, activeClass }) => {
      const linkUri = new URL(link.href).pathname

      if (linkUri === this._router.getUri()) {
        link.classList.add(activeClass)
      } else {
        link.classList.remove(activeClass)
      }
    })
  }
}
