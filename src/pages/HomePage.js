import BasePage from '@/core/BasePage' // базовая страница
import LogoComponent from '@/components/LogoComponent' // логотип
// import ProductService from '@/services/ProductService' // получение продуктов

// const { addProducts, loadProducts } = ProductService

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

  async _afterInit() {
    // const products = await loadProducts()
    // const res = await addProducts(JSON.stringify({ name: 'Product new', type: 'discount' }))
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
    this._elements['btn'].addEventListener('click', () => alert('Клик по кнопке'))
  }
}
