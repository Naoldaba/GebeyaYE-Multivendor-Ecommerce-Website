import { render, screen, fireEvent } from '@testing-library/react';
import ProductCatalog from './ProductCataloge';
import { AuthProvider } from '../components/AuthContext';

// Mock the addToCart and cart functions
const addToCart = jest.fn();
const cart = [];

// Mock the products array
const products = [
  { _id: 1, name: 'Product 1', category: 'Electronics', price: 10, imageurl: 'image1.jpg', description: 'Description 1' },
  { _id: 2, name: 'Product 2', category: 'Clothes', price: 20, imageurl: 'image2.jpg', description: 'Description 2' },
];

test('renders products correctly', () => {
  render(
    <AuthProvider>
      <ProductCatalog
        products={products}
        addToCart={addToCart}
        cart={cart}
      />
    </AuthProvider>
  );

  // Assert that the products are rendered correctly
  const renderedProducts = screen.getAllByRole('img');
  expect(renderedProducts.length).toBe(products.length);

  // Assert that the product information is displayed correctly
  const productNames = screen.getAllByText(/product \d/i);
  expect(productNames.length).toBe(products.length);

  const productPrices = screen.getAllByText(/price: \d+Br\./i);
  expect(productPrices.length).toBe(products.length);
});

test('addToCart should be called when "Add to Cart" button is clicked', () => {
  const addToCart = jest.fn(); // Create a new mock function

  render(
    <AuthProvider>
      <ProductCatalog
        products={products}
        addToCart={addToCart}
        cart={cart}
      />
    </AuthProvider>
  );

  const addToCartButtons = screen.getAllByText('Add to Cart');

  fireEvent.click(addToCartButtons[0]);

  expect(addToCart).toHaveBeenCalled();
  expect(addToCart).toHaveBeenCalledTimes(1);
});

test('handleSocialShare should open the correct social sharing platform', () => {
  render(
    <AuthProvider>
    <ProductCatalog
      products={products}
      addToCart={addToCart}
      cart={cart}
    />
  </AuthProvider>
  );

  const facebookButtons = screen.getAllByRole('button', { name: /facebook/i });
  const twitterButton = screen.getAllByRole('button', { name: /twitter/i });
  const instagramButton = screen.getAllByRole('button', { name: /instagram/i });

  window.open = jest.fn();

  fireEvent.click(facebookButtons[0]);
  expect(window.open).toHaveBeenCalledWith(expect.stringContaining('facebook.com'));

  fireEvent.click(twitterButton[0]);
  expect(window.open).toHaveBeenCalledWith(expect.stringContaining('twitter.com'));

  fireEvent.click(instagramButton[0]);
  expect(window.open).toHaveBeenCalledWith(expect.stringContaining('instagram.com'));
});