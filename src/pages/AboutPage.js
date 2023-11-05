import BasePage from '@/core/BasePage' // базовая страница
import store from '@/store'
import { REFRESH_BIDS, refreshBids } from '@/reducers/bidsReducer' // хранилище состояний

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

  async _beforeInit() {
    store.subscribe(REFRESH_BIDS, () => {
      // eslint-disable-next-line
      alert('Подписка на REFRESH_BIDS запустилась')
      // Здесь происходит какая то логика.
      // Данный колбэк сработает при вызове редьюсера у которого параметр type будет равен REFRESH_BIDS.
    })
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
          <p data-el="text">Создание самописного framework на нативном JavaScript с использованием Webpack.</p>
          <p>Нажми на первый параграф</p>
        </div>
      `
  }

  /**
   * Прослушка событий
   *
   * @protected
   */
  _initListeners() {
    this._elements.text.addEventListener('click', () => {
      const data = [1, 2, 3, 4, 5]

      store.dispatch(refreshBids(data))
    })
  }
}
