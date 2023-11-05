import Store from '@/core/Store' // хранилище типа Redux
import { bidsReducer, bidsState } from '@/reducers/bidsReducer' // reducer для заявок

// Объединяем все reducer
const reducers = [bidsReducer]

// Объединяем все состояния
const initState = {
  ...bidsState,
}

// Регистрация хранилища состояний
const store = new Store(reducers, initState)
const storeKey = Symbol.for('storeKey')

// Не обязательно использовать globalThis можно просто вернуть store
// globalThis в дальнейшем может пригодиться для отладки
globalThis[storeKey] = store

export default globalThis[storeKey]
