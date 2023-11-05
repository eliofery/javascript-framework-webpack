import BaseComponent from '@/core/BaseComponent' // базовый компонент

import '@/components/LogoComponent/logo.scss'

/**
 * Логотип
 */
export default class LogoComponent extends BaseComponent {
  /**
   * Создание главной страницы
   */
  constructor({ title = '' } = {}) {
    super()

    this._title = title

    // Инициализация компонента лого
    this._init()
  }

  /**
   * Разметка компонента
   *
   * @returns {string}
   * @protected
   */
  get _template() {
    return `
      <div>
        <p><img class="logo" src="/assets/images/logo.png" width="150" height="150" alt="${this._title}"></p>
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
