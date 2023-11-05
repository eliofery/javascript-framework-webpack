/**
 * Менеджер состояний
 *
 * Вольная реализация Redux.
 */
export default class Store {
  /**
   * Редьюсеры
   *
   * @type {[]}
   * @protected
   */
  _reducers = []

  /**
   * Состояния
   *
   * @type {{}}
   * @protected
   */
  _state = {}

  /**
   * События
   *
   * @type {{}}
   * @protected
   */
  _listeners = {}

  /**
   * Создание хранилища
   *
   * @param reducers
   * @param initState
   */
  constructor(reducers = [], initState = {}) {
    this._reducers = reducers
    this._state = initState
  }

  /**
   * Получить состояние
   *
   * @param name
   * @returns {{}|*}
   */
  getState(name = '') {
    if (this._state[name]) {
      return this._state[name]
    }

    return this._state
  }

  /**
   * Установить состояние
   *
   * @param newState
   * @protected
   */
  _setState(newState) {
    this._state = newState
  }

  /**
   * Подписки на события
   *
   * @param name
   * @param callback
   * @returns {(function(): void)|*}
   */
  subscribe(name, callback) {
    if (!this._listeners[name]) {
      this._listeners[name] = []
    }

    this._listeners[name].push(callback)

    return () => {
      this._listeners = this._listeners[name].filter(listener => listener !== callback)
    }
  }

  /**
   * Вызов события
   *
   * @param action
   */
  dispatch(action) {
    for (const reducer of this._reducers) {
      const previousState = this.getState()
      const newState = reducer(previousState, action)

      if (newState) {
        this._setState(newState)

        const listeners = this._listeners[action.type]

        if (listeners) {
          const currentState = this.getState()

          for (const listener of listeners) {
            listener(currentState)
          }
        }
      }
    }
  }
}
