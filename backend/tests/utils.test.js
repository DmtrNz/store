const {
  validatePagination,
  sanitizeSearchQuery,
  createError,
  formatPaginatedResponse,
  validateProductId
} = require('../utils/validation');

// Тесты для утилитарных функций

describe('Utility Functions', () => {
  describe('Валидация параметров', () => {
    it('должен корректно обрабатывать параметры пагинации', () => {
      expect(validatePagination(1, 10)).toEqual({ page: 1, limit: 10 });
      expect(validatePagination('2', '20')).toEqual({ page: 2, limit: 20 });
      expect(validatePagination(-1, 0)).toEqual({ page: 1, limit: 12 });
      expect(validatePagination('abc', 'xyz')).toEqual({ page: 1, limit: 12 });
    });

    it('должен корректно обрабатывать поисковые запросы', () => {
      expect(sanitizeSearchQuery('  Тестовый товар  ')).toBe('тестовый товар');
      expect(sanitizeSearchQuery('')).toBe('');
      expect(sanitizeSearchQuery(null)).toBe('');
      expect(sanitizeSearchQuery(undefined)).toBe('');
    });

    it('должен валидировать ID товара', () => {
      expect(validateProductId('1')).toBe(true);
      expect(validateProductId(1)).toBe(true);
      expect(validateProductId('abc')).toBe(false);
      expect(validateProductId(0)).toBe(false);
      expect(validateProductId(-1)).toBe(false);
      expect(validateProductId(null)).toBe(false);
    });
  });

  describe('Обработка ошибок', () => {
    it('должен создавать стандартные объекты ошибок', () => {
      const error = createError('Тестовая ошибка', 400);
      
      expect(error).toHaveProperty('error');
      expect(error).toHaveProperty('statusCode');
      expect(error).toHaveProperty('timestamp');
      expect(error.error).toBe('Тестовая ошибка');
      expect(error.statusCode).toBe(400);
    });

    it('должен использовать код статуса по умолчанию', () => {
      const error = createError('Ошибка по умолчанию');
      expect(error.statusCode).toBe(500);
    });
  });

  describe('Форматирование ответов', () => {
    it('должен форматировать ответы с пагинацией', () => {
      const result = formatPaginatedResponse(
        [{ id: 1, name: 'Товар' }],
        1,
        10,
        25
      );

      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('pagination');
      expect(result.pagination.currentPage).toBe(1);
      expect(result.pagination.totalPages).toBe(3);
      expect(result.pagination.totalCount).toBe(25);
      expect(result.pagination.hasNext).toBe(true);
      expect(result.pagination.hasPrev).toBe(false);
    });

    it('должен корректно обрабатывать граничные случаи пагинации', () => {
      const result = formatPaginatedResponse([], 1, 10, 0);
      
      expect(result.pagination.totalPages).toBe(0);
      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.hasPrev).toBe(false);
    });
  });
}); 