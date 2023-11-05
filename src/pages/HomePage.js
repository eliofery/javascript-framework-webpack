import BasePage from '@/core/BasePage' // базовая страница
import LogoComponent from '@/components/LogoComponent' // логотип

// Подключаемые компоненты
const components = {
  logo: new LogoComponent({ title: 'JavaScript Framework' }),
}

/**
 * Главная страница
 */
export default class HomePage extends BasePage {
  /**
   * Создание главной страницы
   */
  constructor() {
    super()

    document.title = `Главная страница - ${this._title}`

    // Подключение компонентов
    this._setComponents(components)

    // Инициализация главной страницы
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
      <div class="home-page">
        <div class="container">
          <div data-el="logo"><!-- LogoComponent --></div>

          <button type="button" data-el="btn">Кнопка</button>
        </div>
      </div>
    `
  }

  /**
   * Прослушка событий
   *
   * @protected
   */
  _initListeners() {
    // eslint-disable-next-line
    this._elements['btn'].addEventListener('click', () => console.log('Клик по кнопке'))
  }
}
