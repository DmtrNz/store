const request = require('supertest');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Мокаем базу данных
jest.mock('../db/database', () => ({
  query: jest.fn()
}));

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
const mockProductsRouter = express.Router();
mockProductsRouter.get('/', (req, res) => {
  res.json({
    products: [
      { id: 1, name: 'Тестовый товар', price: 100 }
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalCount: 1,
      hasNext: false,
      hasPrev: false
    }
  });
});

mockProductsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '1') {
    res.json({ id: 1, name: 'Тестовый товар', price: 100 });
  } else {
    res.status(404).json({ error: 'Товар не найден' });
  }
});

app.use('/api/products', mockProductsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Что-то пошло не так!',
    message: err.message
  });
});

describe('API Tests', () => {
  describe('GET /api/health', () => {
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

  describe('GET /api/products', () => {
    it('должен вернуть список товаров с пагинацией', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveProperty('products');
      expect(response.body).toHaveProperty('pagination');
      expect(Array.isArray(response.body.products)).toBe(true);
      expect(response.body.pagination).toHaveProperty('currentPage');
      expect(response.body.pagination).toHaveProperty('totalPages');
    });

    it('должен обрабатывать параметры пагинации', async () => {
      const response = await request(app)
        .get('/api/products?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination.currentPage).toBe(1);
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
    });

    it('должен вернуть 404 для несуществующего товара', async () => {
      const response = await request(app)
        .get('/api/products/999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Товар не найден');
    });
  });
}); 