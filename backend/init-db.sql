-- Создание таблицы товаров
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
);

-- Проверяем, есть ли уже данные
DO $$
BEGIN
  IF (SELECT COUNT(*) FROM products) = 0 THEN
    -- Вставляем тестовые данные
    INSERT INTO products (name, description, price, image_url, category, stock_quantity, rating) VALUES
    ('iPhone 15 Pro', 'Новейший смартфон Apple с титановым корпусом и камерой 48 МП', 129999, 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400', 'Смартфоны', 25, 4.8),
    ('MacBook Air M2', 'Ультратонкий ноутбук с чипом M2 и 18-часовой автономностью', 149999, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 'Ноутбуки', 15, 4.9),
    ('AirPods Pro', 'Беспроводные наушники с активным шумоподавлением', 24999, 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400', 'Аудио', 50, 4.7),
    ('iPad Air', 'Мощный планшет с чипом M1 и поддержкой Apple Pencil', 69999, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', 'Планшеты', 30, 4.6),
    ('Apple Watch Series 9', 'Умные часы с новым чипом S9 и улучшенными датчиками', 39999, 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400', 'Умные часы', 40, 4.5),
    ('iMac 24"', 'Моноблок с дисплеем 4.5K и чипом M3', 199999, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', 'Компьютеры', 10, 4.8),
    ('Sony WH-1000XM5', 'Лучшие наушники с шумоподавлением от Sony', 35999, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 'Аудио', 35, 4.9),
    ('Samsung Galaxy S24', 'Флагманский смартфон с ИИ-функциями', 99999, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', 'Смартфоны', 20, 4.7),
    ('Dell XPS 13', 'Премиальный ультрабук с безрамочным дисплеем', 129999, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 'Ноутбуки', 12, 4.6),
    ('Nintendo Switch OLED', 'Портативная игровая консоль с OLED экраном', 29999, 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400', 'Игровые консоли', 45, 4.8),
    ('Canon EOS R6', 'Беззеркальная камера для профессиональной съемки', 249999, 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400', 'Фотоаппараты', 8, 4.9),
    ('DJI Mini 3 Pro', 'Компактный дрон с 4K камерой и автономностью', 89999, 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400', 'Дроны', 15, 4.7);
  END IF;
END $$; 