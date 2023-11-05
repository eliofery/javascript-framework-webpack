import BasePage from '@/core/BasePage' // базовая страница

/**
 * Страница о нас
 */
export default class AboutPage extends BasePage {
  /**
   * Создание страницы о нас
   */
  constructor() {
    super()

    document.title = `О нас - ${this._title}`

    // Инициализация страницы о нас
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
        <div>
          Создание самописного framework на нативном JavaScript с использованием Webpack.
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
