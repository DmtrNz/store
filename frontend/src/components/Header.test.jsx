import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('отображает логотип и поле поиска', () => {
    render(<Header searchQuery="" setSearchQuery={() => {}} />);
    expect(screen.getByText('🛍️ DmtrNz Store')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Поиск товаров...')).toBeInTheDocument();
  });
}); 