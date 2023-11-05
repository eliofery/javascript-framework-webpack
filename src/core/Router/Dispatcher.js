import HISTORY_TYPE_ENUM from '@/core/Router/HistoryTypeEnum' // виды роутинга

/**
 * Родительский класс для Router
 *
 * Содержит вспомогательные методы для Router.
 */
export default class Dispatcher {
  /**
   * Разрешение на создание экземпляра класса
   *
   * @type {boolean}
   * @protected
   */
  static _initializing = false

  /**
   * Экземпляр класса
   *
   * @type {null}
   * @protected
   */
  static _instance = null

  /**
   * Режим истории по умолчанию с использованием хэша
   *
   * @type {string}
   * @property
   */
  _history = HISTORY_TYPE_ENUM.HASH

  /**
   * Роуты
   *
   * @type {[]}
   * @property
   */
  _routes = []

  /**
   * Основной корневой элемент в который будет добавляться разметка
   *
   * @type {string}
   * @protected
   */
  _root = '#app'

  /**
   * Данный класс является абстрактным
   */
  constructor() {
    if (!Dispatcher._initializing) {
      throw new TypeError('Нельзя напрямую создать экземпляр данного класса')
    }
  }

  /**
   * Получение основного корневого элемента
   *
   * @returns {string}
   */
  get root() {
    return this._root
  }

  /**
   * Изменение основного корневого элемента
   *
   * @param selector
   */
  set root(selector) {
    this._root = selector
  }

  /**
   * Создание экземпляра класса
   *
   * @returns {*|null}
   */
  static get instance() {
    // Возвращаем объект данного класса если он был уже создан
    if (this._instance instanceof this) {
      return this._instance
    }

    // Если объект не был создан создаем его и возвращаем
    Dispatcher._initializing = true
    this._instance = new this()
    Dispatcher._initializing = false

    return this._instance
  }

  /**
   * Получить активный режим истории
   *
   * @returns {string}
   */
  get history() {
    return this._history
  }

  /**
   * Получить список всех роутов
   *
   * @returns {[]}
   */
  get routes() {
    return this._routes
  }

  /**
   * Режим роута с хэшем
   *
   * @returns {string}
   */
  static createWebHashHistory() {
    return HISTORY_TYPE_ENUM.HASH
  }

  /**
   * Режим роута стандартный
   *
   * @returns {string}
   */
  static createWebHistory() {
    return HISTORY_TYPE_ENUM.STATE
  }

  /**
   * Форматирование текущего адреса страницы для режима хэш
   *
   * @returns {string}
   * @protected
   */
  _strippedHashPath() {
    return `/${window.location.hash.replace(/^#\//, '')}` // '#/foo/bar' -> '/foo/bar'
  }

  /**
   * Форматирование текущего адреса страницы в стандартном режиме
   *
   * @returns {string}
   * @protected
   */
  _strippedPath() {
    return `/${window.location.pathname
      .replace(/^\/+|\/+$/g, '') // '////foo/bar////' -> 'foo/bar'
      .replace(/\/+/g, '/')}` // 'foo/////bar' -> 'foo/bar'
  }
}
