import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const product = {
    id: 1,
    name: 'Тестовый товар',
    category: 'Электроника',
    image_url: 'https://via.placeholder.com/300x200',
    rating: 4.5,
    stock_quantity: 10
  };

  it('отображает название и категорию товара', () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );
    expect(screen.getByText('Тестовый товар')).toBeInTheDocument();
    expect(screen.getByText('Электроника')).toBeInTheDocument();
  });
}); 