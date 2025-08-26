import { Search, ShoppingBag } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          🛍️ DmtrNZ.shop
        </div>
        <div className="search-container">
          <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#718096' }} />
          <input
            type="text"
            className="search-input"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '45px' }}
          />
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          color: '#667eea',
          fontWeight: '600'
        }}>
          <ShoppingBag size={24} />
          <span>Корзина</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 