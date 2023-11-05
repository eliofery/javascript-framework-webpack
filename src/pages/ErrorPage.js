import BasePage from '@/core/BasePage' // базовая страница

/**
 * Страница 404
 */
export default class ErrorPage extends BasePage {
  /**
   * Создание страницы
   */
  constructor() {
    super()

    document.title = `Страница 404 - ${this._title}`

    // Инициализация страницы
    this._init()
  }

  /**
   * Разметка страницы
   *
   * @returns {string}
   * @protected
   */
  get _template() {
    return `
        <div class="container">
          Страница не найдена 404.
        </div>
      `
  }

  /**
   * Прослушка событий
   *
   * @protected
   */
  _initListeners() {}
}
