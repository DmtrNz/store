import { Star, Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // formatPrice удалён, так как не используется

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img 
          src={product.image_url} 
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Изображение+не+найдено';
          }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          opacity: 0,
          transform: 'scale(0.8)'
        }} className="add-to-cart-btn">
          <ShoppingCart size={20} color="#667eea" />
        </div>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <Star size={16} fill="#fbbf24" color="#fbbf24" />
          <span>{product.rating}</span>
          <span>•</span>
          <Package size={16} />
          <span>{product.stock_quantity} шт.</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 