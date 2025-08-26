import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('отображает логотип и поле поиска', () => {
    render(<Header searchQuery="" setSearchQuery={() => {}} />);
    expect(screen.getByText('🛍️ DmtrNZ shop')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Поиск товаров...')).toBeInTheDocument();
  });
}); 