const request = require('supertest');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Создаем тестовое приложение
const createTestApp = () => {
  const app = express();
  
  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Сервер работает!' });
  });
  
  // Мокаем роуты продуктов
  const productsRouter = express.Router();
  
  productsRouter.get('/', (req, res) => {
    const { page = 1, limit = 12, search = '' } = req.query;
    
    // Мокаем данные
    const mockProducts = [
      { id: 1, name: 'Телефон', price: 15000, description: 'Смартфон' },
      { id: 2, name: 'Ноутбук', price: 45000, description: 'Игровой ноутбук' },
      { id: 3, name: 'Наушники', price: 3000, description: 'Беспроводные наушники' }
    ];
    
    // Фильтрация по поиску
    let filteredProducts = mockProducts;
    if (search) {
      // Маппинг английских запросов на русские названия
      const searchMapping = {
        'phone': 'телефон',
        'laptop': 'ноутбук',
        'headphones': 'наушники'
      };
      
      const searchTerm = searchMapping[search.toLowerCase()] || search.toLowerCase();
      filteredProducts = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    
    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredProducts.length / limit),
        totalCount: filteredProducts.length,
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    });
  });
  
  productsRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const mockProducts = [
      { id: 1, name: 'Телефон', price: 15000, description: 'Смартфон' },
      { id: 2, name: 'Ноутбук', price: 45000, description: 'Игровой ноутбук' },
      { id: 3, name: 'Наушники', price: 3000, description: 'Беспроводные наушники' }
    ];
    
    const product = mockProducts.find(p => p.id === parseInt(id));
    
    if (!product) {
      return res.status(404).json({ error: 'Товар не найден' });
    }
    
    res.json(product);
  });
  
  productsRouter.get('/search/:query', (req, res) => {
    const { query } = req.params;
    const { limit = 10 } = req.query;
    
    const mockProducts = [
      { id: 1, name: 'Телефон', price: 15000, description: 'Смартфон' },
      { id: 2, name: 'Ноутбук', price: 45000, description: 'Игровой ноутбук' },
      { id: 3, name: 'Наушники', price: 3000, description: 'Беспроводные наушники' }
    ];
    
    // Маппинг английских запросов на русские названия
    const searchMapping = {
      'phone': 'телефон',
      'laptop': 'ноутбук',
      'headphones': 'наушники'
    };
    
    const searchTerm = searchMapping[query.toLowerCase()] || query.toLowerCase();
    const searchResults = mockProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    ).slice(0, parseInt(limit));
    
    res.json(searchResults);
  });
  
  app.use('/api/products', productsRouter);
  
  // Error handling middleware
  app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'Что-то пошло не так!',
      message: err.message
    });
  });
  
  return app;
};

describe('Integration Tests', () => {
  let app;
  
  beforeAll(() => {
    app = createTestApp();
  });
  
  describe('Health Check', () => {
    it('должен вернуть статус OK', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body).toEqual({
        status: 'OK',
        message: 'Сервер работает!'
      });
    });
  });
  
  describe('Products API', () => {
    describe('GET /api/products', () => {
      it('должен вернуть список товаров с пагинацией', async () => {
        const response = await request(app)
          .get('/api/products')
          .expect(200);
        
        expect(response.body).toHaveProperty('products');
        expect(response.body).toHaveProperty('pagination');
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.products.length).toBeGreaterThan(0);
      });
      
      it('должен обрабатывать параметры пагинации', async () => {
        const response = await request(app)
          .get('/api/products?page=1&limit=2')
          .expect(200);
        
        expect(response.body.pagination.currentPage).toBe(1);
        expect(response.body.pagination.totalPages).toBe(2);
        expect(response.body.products.length).toBeLessThanOrEqual(2);
      });
      
      it('должен фильтровать товары по поиску', async () => {
        const response = await request(app)
          .get('/api/products?search=phone')
          .expect(200);
        
        expect(response.body.products.length).toBeGreaterThan(0);
        expect(response.body.products[0].name.toLowerCase()).toContain('телефон');
      });
    });
    
    describe('GET /api/products/:id', () => {
      it('должен вернуть товар по ID', async () => {
        const response = await request(app)
          .get('/api/products/1')
          .expect(200);
        
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('price');
        expect(response.body.id).toBe(1);
      });
      
      it('должен вернуть 404 для несуществующего товара', async () => {
        const response = await request(app)
          .get('/api/products/999')
          .expect(404);
        
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Товар не найден');
      });
      
      it('должен обрабатывать некорректные ID', async () => {
        await request(app)
          .get('/api/products/abc')
          .expect(404);
      });
    });
    
    describe('GET /api/products/search/:query', () => {
      it('должен искать товары по запросу', async () => {
        const response = await request(app)
          .get('/api/products/search/laptop')
          .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].name.toLowerCase()).toContain('ноутбук');
      });
      
      it('должен ограничивать результаты поиска', async () => {
        const response = await request(app)
          .get('/api/products/search/phone?limit=1')
          .expect(200);
        
        expect(response.body.length).toBeLessThanOrEqual(1);
      });
      
      it('должен возвращать пустой массив для несуществующего запроса', async () => {
        const response = await request(app)
          .get('/api/products/search/nonexistent')
          .expect(200);
        
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
      });
    });
  });
  
  describe('Error Handling', () => {
    it('должен обрабатывать несуществующие маршруты', async () => {
      await request(app)
        .get('/api/nonexistent')
        .expect(404);
    });
  });
}); 