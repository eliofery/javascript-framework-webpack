import Response from '@/core/Response' // подобие axios

// Подготовительные POST запросы
const apiClientPost = Response.create({
  baseUrl: process.env.API_URL, // смотреть файл development.env или production.env
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

// Подготовительные GET запросы
const apiClientGet = Response.create({
  baseUrl: process.env.API_URL, // смотреть файл development.env или production.env
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

export default {
  /**
   * Добавление продукта
   *
   * @param data
   * @returns {*}
   */
  addProducts(data) {
    return apiClientPost.post('/products/add', data)
  },

  /**
   * Получение продуктов
   *
   * @returns {*}
   */
  loadProducts() {
    return apiClientGet.get('/products')
  },
}
