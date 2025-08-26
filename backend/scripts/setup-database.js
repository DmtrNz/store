const { Pool } = require('pg');
require('dotenv').config({ path: './config.env' });

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const setupDatabase = async () => {
  try {
    console.log('🔧 Настройка базы данных...');
    
    // Создание таблицы товаров
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url VARCHAR(500),
        category VARCHAR(100),
        stock_quantity INTEGER DEFAULT 0,
        rating DECIMAL(3,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('✅ Таблица products создана');
    
    // Проверяем, есть ли уже данные
    const existingData = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(existingData.rows[0].count) > 0) {
      console.log('📦 Данные уже существуют, пропускаем заполнение');
      return;
    }
    
    // Тестовые данные
    const products = [
      {
        name: 'iPhone 15 Pro',
        description: 'Новейший смартфон Apple с титановым корпусом и камерой 48 МП',
        price: 129999,
        image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        category: 'Смартфоны',
        stock_quantity: 25,
        rating: 4.8
      },
      {
        name: 'MacBook Air M2',
        description: 'Ультратонкий ноутбук с чипом M2 и 18-часовой автономностью',
        price: 149999,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        category: 'Ноутбуки',
        stock_quantity: 15,
        rating: 4.9
      },
      {
        name: 'AirPods Pro',
        description: 'Беспроводные наушники с активным шумоподавлением',
        price: 24999,
        image_url: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400',
        category: 'Аудио',
        stock_quantity: 50,
        rating: 4.7
      },
      {
        name: 'iPad Air',
        description: 'Мощный планшет с чипом M1 и поддержкой Apple Pencil',
        price: 69999,
        image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
        category: 'Планшеты',
        stock_quantity: 30,
        rating: 4.6
      },
      {
        name: 'Apple Watch Series 9',
        description: 'Умные часы с новым чипом S9 и улучшенными датчиками',
        price: 39999,
        image_url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
        category: 'Умные часы',
        stock_quantity: 40,
        rating: 4.5
      },
      {
        name: 'iMac 24"',
        description: 'Моноблок с дисплеем 4.5K и чипом M3',
        price: 199999,
        image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
        category: 'Компьютеры',
        stock_quantity: 10,
        rating: 4.8
      },
      {
        name: 'Sony WH-1000XM5',
        description: 'Лучшие наушники с шумоподавлением от Sony',
        price: 35999,
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
        category: 'Аудио',
        stock_quantity: 35,
        rating: 4.9
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Флагманский смартфон с ИИ-функциями',
        price: 99999,
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        category: 'Смартфоны',
        stock_quantity: 20,
        rating: 4.7
      },
      {
        name: 'Dell XPS 13',
        description: 'Премиальный ультрабук с безрамочным дисплеем',
        price: 129999,
        image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
        category: 'Ноутбуки',
        stock_quantity: 12,
        rating: 4.6
      },
      {
        name: 'Nintendo Switch OLED',
        description: 'Портативная игровая консоль с OLED экраном',
        price: 29999,
        image_url: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400',
        category: 'Игровые консоли',
        stock_quantity: 45,
        rating: 4.8
      },
      {
        name: 'Canon EOS R6',
        description: 'Беззеркальная камера для профессиональной съемки',
        price: 249999,
        image_url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
        category: 'Фотоаппараты',
        stock_quantity: 8,
        rating: 4.9
      },
      {
        name: 'DJI Mini 3 Pro',
        description: 'Компактный дрон с 4K камерой и автономностью',
        price: 89999,
        image_url: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400',
        category: 'Дроны',
        stock_quantity: 15,
        rating: 4.7
      }
    ];
    
    // Вставка данных
    for (const product of products) {
      await pool.query(`
        INSERT INTO products (name, description, price, image_url, category, stock_quantity, rating)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `, [product.name, product.description, product.price, product.image_url, product.category, product.stock_quantity, product.rating]);
    }
    
    console.log(`✅ Добавлено ${products.length} товаров в базу данных`);
    console.log('🎉 Настройка базы данных завершена!');
    
  } catch (error) {
    console.error('❌ Ошибка при настройке базы данных:', error);
  } finally {
    await pool.end();
  }
};

setupDatabase(); 