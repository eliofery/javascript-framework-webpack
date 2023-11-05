import BaseComponent from '@/core/BaseComponent' // Базовый компонент

/**
 * Базовая страница
 */
export default class BasePage extends BaseComponent {
  /**
   * Шаблон страницы
   *
   * @type {Promise<{readonly default?: *}>}
   * @protected
   */
  _layout = import('@/layouts/MainLayout')

  /**
   * Заголовок страницы
   *
   * @type {string}
   * @protected
   */
  _title = 'JavaScript framework'

  /**
   * Создание страницы
   */
  constructor() {
    super()

    document.title = 'Главая страница'
  }

  /**
   * Получение шаблона страницы
   *
   * @returns {Promise<{readonly default?: *}>}
   */
  get layout() {
    return this._layout
  }
}
