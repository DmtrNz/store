import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Package, Calendar, ShoppingCart, Heart } from 'lucide-react';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке товара:', err);
        setError('Товар не найден или сервер недоступен');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div>🔄 Загружаем информацию о товаре...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error">
        ❌ {error || 'Товар не найден'}
        <br />
        <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Убедитесь, что бэкенд запущен: <code>npm run dev:backend</code>
        </div>
        <Link to="/" className="back-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
          <ArrowLeft size={16} />
          Вернуться к товарам
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back-button">
        <ArrowLeft size={16} />
        Вернуться к товарам
      </Link>

      <div className="product-detail">
        <div className="product-detail-header">
          <div style={{ position: 'relative' }}>
            <img 
              src={product.image_url} 
              alt={product.name}
              className="product-detail-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Изображение+не+найдено';
              }}
            />
            <div style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              display: 'flex',
              gap: '0.5rem'
            }}>
              <button style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <Heart size={20} color="#667eea" />
              </button>
              <button style={{
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <ShoppingCart size={20} color="#667eea" />
              </button>
            </div>
          </div>
          
          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-description">{product.description}</p>
            
            <div className="product-detail-meta">
              <div className="meta-item">
                <span className="meta-label">Категория</span>
                <span className="meta-value">{product.category}</span>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Рейтинг</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={16} fill="#fbbf24" color="#fbbf24" />
                  <span className="meta-value">{product.rating}</span>
                </div>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">В наличии</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Package size={16} />
                  <span className="meta-value">{product.stock_quantity} шт.</span>
                </div>
              </div>
              
              <div className="meta-item">
                <span className="meta-label">Добавлен</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Calendar size={16} />
                  <span className="meta-value">{formatDate(product.created_at)}</span>
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, #f7fafc, #edf2f7)',
              borderRadius: '15px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{ marginBottom: '1rem', color: '#2d3748', fontSize: '1.2rem' }}>
                🚚 Доставка и оплата
              </h3>
              <div style={{ color: '#718096', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.5rem' }}>✅ Бесплатная доставка при заказе от 5000 ₽</p>
                <p style={{ marginBottom: '0.5rem' }}>💳 Оплата при получении или онлайн</p>
                <p>📦 Доставка по всей России</p>
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '1rem'
            }}>
              <button style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
              }}>
                <ShoppingCart size={20} />
                Добавить в корзину
              </button>
              
              <button style={{
                background: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Heart size={20} />
                В избранное
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 