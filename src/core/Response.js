/**
 * Запросы к серверу
 *
 * Вольная реализация axios.
 */
export default class Response {
  // Используется для создания объекта класса
  static _initialization = false

  // Опции запроса
  _options = {}

  // Базовый урл запроса
  _baseUrl = ''

  /**
   * Создание запроса напрямую запрещен
   */
  constructor() {
    if (!Response._initialization) {
      throw new TypeError('Нельзя напрямую создать экземпляр данного класса')
    }
  }

  /**
   * Создание запроса
   *
   * @param options
   * @returns {Response}
   */
  static create(options = {}) {
    // Создаем объект класса
    Response._initialization = true
    const response = new Response()
    Response._initialization = false

    // Получаем базовый урл
    response._baseUrl = options.baseUrl ?? ''

    // Удаляем базовый урл из опциональных параметров
    delete options.baseUrl

    // Получаем опциональные параметры
    response._options = options

    return response
  }

  /**
   * Запрос на сервер
   *
   * @param url
   * @param options
   * @returns {Promise<any>}
   * @private
   */
  _response = async (url, options = {}) => {
    try {
      const response = await fetch(url, options)

      return await response.json()
    } catch (e) {
      // eslint-disable-next-line
      if (process.env.NODE_ENV === 'development') console.log(e.message)
      throw e
    }
  }

  /**
   * Получение данных методом GET
   *
   * @param url
   * @returns {Promise<*>}
   */
  get(url = '') {
    url = new URL(url, this._baseUrl)

    return this._response(url.href, this._options)
  }

  /**
   * Получение данных методом POST
   *
   * @param url
   * @param data
   * @returns {Promise<*>}
   */
  post(url = '', data = {}) {
    url = new URL(url, this._baseUrl)

    this._options = {
      ...this._options,
      method: 'post',
      body: data,
    }

    return this._response(url.href, this._options)
  }
}
