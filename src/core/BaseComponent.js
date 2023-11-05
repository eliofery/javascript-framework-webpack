export default class BaseComponent {
  /**
   * Node элемент самого компонента
   *
   * @type {null}
   * @protected
   */
  _component = null

  /**
   * Вложенные в компонент элементы верстки
   *
   * С которыми в процессе необходимо будет взаимодействовать.
   *
   * @type {{}}
   * @protected
   */
  _elements = {}

  /**
   * Вложенные в компонент другие компоненты
   *
   * @type {{}}
   * @protected
   */
  _components = {}

  /**
   * Для отмены прослушки событий
   *
   * @type {AbortController}
   * @protected
   */
  _abortController = new AbortController()

  /**
   * Абстрактный класс
   */
  constructor() {
    if (this.constructor.name === 'BaseComponent') {
      throw new TypeError('Абстрактный класс!')
    }
  }

  /**
   * Получение разметки компонента
   *
   * @returns {string}
   * @protected
   */
  get _template() {
    return ''
  }

  /**
   * Получение компонента
   *
   * @returns {null}
   */
  get component() {
    return this._component
  }

  /**
   * Получение вложенных в компонент элементов верстки
   *
   * @returns {{}}
   */
  get elements() {
    return this._elements
  }

  /**
   * Установка вложенных компонентов
   *
   * @param components
   * @protected
   */
  _setComponents(components) {
    this._components = components
  }

  /**
   * Переотрисовка вложенных компонентов
   *
   * @param components
   * @protected
   */
  _reloadComponents(components) {
    this._setComponents(components)
    this._initComponents()
  }

  /**
   * Инициализация компонента
   *
   * @protected
   */
  _init() {
    this._beforeInit().then()
    this._initComponent()
    this._initElements()
    this._initComponents()
    this._initListeners()
    this._afterInit().then()
  }

  /**
   * Пользовательские действия, происходящие до инициализации компонента
   *
   * @returns {Promise<void>}
   * @protected
   */
  async _beforeInit() {
    // Абстрактный метод!
    // await this._loadData()
    // await this._updateData()
  }

  /**
   * Пользовательские действия, происходящие после инициализации компонента
   *
   * @returns {Promise<void>}
   * @protected
   */
  async _afterInit() {
    // Абстрактный метод!
    // await this._loadData()
    // await this._updateData()
  }

  /**
   * Загрузка данных, например по api
   *
   * @protected
   */
  _loadData() {
    // Абстрактный метод!
  }

  /**
   * Обновление данных
   *
   * @protected
   */
  _updateData() {
    // Абстрактный метод!
  }

  /**
   * Создание ноды компонента
   *
   * @protected
   */
  _initComponent() {
    // Создаем элемент обертки
    const wrapper = document.createElement('div')

    // Помещаем внутрь обертки разметку html компонента
    wrapper.innerHTML = this._template

    // Получаем разметку компонента в виде Node
    this._component = wrapper.firstElementChild || wrapper
  }

  /**
   * Получение вложенных элементов в компоненте
   *
   * @param component
   * @protected
   */
  _initElements(component = this._component) {
    // Находим все элементы внутри компонента имеющие атрибут data-el
    const list = component.querySelectorAll('[data-el]')

    // Перебираем каждый вложенный элемент с атрибутом data-el
    list.forEach(item => {
      // Получаем значение атрибута data-el
      const name = item.dataset.el

      // Сохраняем Node каждого элемента
      this._elements[name] = item
    })
  }

  /**
   * Инициализация вложенных компонентов
   *
   * @protected
   */
  _initComponents() {
    // Проходимся по каждому ключу объекта _components
    for (const componentName of Object.keys(this._components)) {
      // Ключи подключаемых компонентов должны совпадать с названием
      // атрибута data-el у вложенных в родительский компонент элемента,
      // находим такой элемент, на его место будет подставляться, вложенный компонент.
      let root = this._elements[componentName]

      // Вложенный компонент можно передать двумя способами:
      // _setComponents({ nameComponent: new SomeComponent() })
      // _setComponents({ nameComponent: SomeComponent })
      // здесь идет определение того каким образом был передан вложенный компонент
      // и на основе этого идет получение свойства _component, который в свою очередь хранит
      // Node элемент компонента
      const { component } =
        typeof this._components[componentName] === 'object' && !Array.isArray(this._components[componentName])
          ? this._components[componentName]
          : new this._components[componentName]()

      // Если элементы найдены, то рендерим компонент
      if (root && component) {
        // Получаем data-el
        component.dataset.el = root.dataset.el

        // Переопределяем внутренний элемент
        this._elements[root.dataset.el] = component

        // Рендерим компонент
        root.insertAdjacentElement('beforebegin', component)
        root.remove()
        root = null

        // Получаем вложенные элементы в компоненте
        this._initElements(component)
      }
    }
  }

  /**
   * Прослушка событий
   *
   * @protected
   */
  _initListeners() {
    // Абстрактный метод!
  }

  /**
   * Обновление содержимого компонента
   *
   * @param data
   */
  update(data = {}) {
    // Перебираем все необходимые вложенные элементы
    // и изменяем их внутреннее содержимое
    for (const [key, value] of Object.entries(data)) {
      if (this._elements[key]) {
        this._elements[key].innerHTML = value
      }
    }
  }

  /**
   * Полное удаление компонента
   */
  destroy() {
    this._remove()
    this._removeListeners()
  }

  /**
   * Удаление компонента
   *
   * @protected
   */
  _remove() {
    // this._component?.remove()
    this._component.innerHTML = ''
    this._elements = {}
  }

  /**
   * Удаление прослушек событий
   *
   * @protected
   */
  _removeListeners() {
    this._abortController.abort()
  }
}
