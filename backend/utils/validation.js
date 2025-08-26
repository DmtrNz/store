/**
 * Утилиты для валидации и обработки данных
 */

/**
 * Валидация параметров пагинации
 * @param {number|string} page - номер страницы
 * @param {number|string} limit - количество элементов на странице
 * @returns {Object} объект с валидными параметрами
 */
const validatePagination = (page, limit) => {
  const validPage = Math.max(1, parseInt(page) || 1);
  const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 12));
  return { page: validPage, limit: validLimit };
};

/**
 * Очистка поискового запроса
 * @param {string} query - поисковый запрос
 * @returns {string} очищенный запрос
 */
const sanitizeSearchQuery = (query) => {
  if (!query || typeof query !== 'string') return '';
  return query.trim().toLowerCase();
};

/**
 * Создание стандартного объекта ошибки
 * @param {string} message - сообщение об ошибке
 * @param {number} statusCode - код статуса
 * @returns {Object} объект ошибки
 */
const createError = (message, statusCode = 500) => {
  return {
    error: message,
    statusCode,
    timestamp: new Date().toISOString()
  };
};

/**
 * Форматирование ответа с пагинацией
 * @param {Array} data - данные
 * @param {number} page - текущая страница
 * @param {number} limit - лимит элементов
 * @param {number} total - общее количество
 * @returns {Object} отформатированный ответ
 */
const formatPaginatedResponse = (data, page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  return {
    data,
    pagination: {
      currentPage: parseInt(page),
      totalPages,
      totalCount: total,
      hasNext: page < totalPages,
      hasPrev: page > 1
    }
  };
};

/**
 * Валидация ID товара
 * @param {string|number} id - ID товара
 * @returns {boolean} валидность ID
 */
const validateProductId = (id) => {
  const numId = parseInt(id);
  return !isNaN(numId) && numId > 0;
};

module.exports = {
  validatePagination,
  sanitizeSearchQuery,
  createError,
  formatPaginatedResponse,
  validateProductId
};
