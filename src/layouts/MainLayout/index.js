import BaseComponent from '@/core/BaseComponent' // базовый компонент
import Link from '@/core/Link' // ссылка

// Стили шаблона
import '@/layouts/MainLayout/main-layout.scss'

const components = {
  homeLink: new Link({
    url: '/',
    html: 'Главная страница',
    attributes: { class: 'link' },
  }),

  aboutLink: new Link({
    url: '/about',
    html: 'О фреймворке',
    attributes: { class: 'link' },
  }),
}

/**
 * Основной шаблон
 */
export default class MainLayout extends BaseComponent {
  /**
   * Создание шаблона
   */
  constructor() {
    super()

    // Установка компонентов
    this._setComponents(components)

    // Инициализируем шаблон
    this._init()
  }

  /**
   * Разметка шаблона
   *
   * @returns {string}
   * @protected
   */
  get _template() {
    return `
    <div class="main-layout">
      <header class="main-header">
        <div class="container">
          <div data-el="homeLink"><!-- homeLink --></div>
          <div data-el="aboutLink"><!-- aboutLink --></div>
        </div>
      </header>

      <main data-el="page"><!-- PageComponent --></main>

      <footer class="main-footer">
        <div class="container">Copyright 2023</div>
      </footer>
    </div>
  `
  }
}
