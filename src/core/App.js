/**
 * Инициализация приложения
 *
 */
export default class App {
  /**
   * Объект класса Router
   *
   * @type {{}}
   */
  #router = {}

  /**
   * Создание приложения
   *
   * @param router
   */
  constructor(router) {
    // Получаем объект класса Router
    this.#router = router
  }

  /**
   * Инициализация приложения
   *
   * @param selector
   */
  run(selector = '#app') {
    // Определяем основной селектор приложения
    // в котором будет производиться отрисовка сайта
    this.#router.root = selector

    // Рендерим страницу сайта
    this._render()

    // При изменении ссылки заново рендерим страницу
    window.addEventListener(this.#router.history, () => this._render())
  }

  /**
   * Рендер страницы сайта
   *
   * @protected
   */
  _render() {
    this.#router.render()
  }
}
