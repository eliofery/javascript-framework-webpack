import BaseComponent from '@/core/BaseComponent' // базовый компонент

// Стили шаблона
import '@/layouts/MainLayout/main-layout.scss'

/**
 * Основной шаблон
 */
export default class MainLayout extends BaseComponent {
  /**
   * Создание шаблона
   */
  constructor() {
    super()

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
            <div class="container">Шапка сайта</div>
          </header>

          <main data-el="page"><!-- PageComponent --></main>

          <footer class="main-footer">
            <div class="container">Copyright 2023</div>
          </footer>
        </div>
      `
  }
}
