/**
 * Режимы истории
 *
 * @type {Readonly<{STATE: string, HASH: string}>}
 */
const HISTORY_TYPE_ENUM = Object.freeze({
  HASH: 'hashchange', // для ссылки с хэшем
  STATE: 'popstate', // для стандартной ссылки
})

export default HISTORY_TYPE_ENUM
