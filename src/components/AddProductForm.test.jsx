import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddProductForm from './AddProductForm';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
// Mock the necessary functions
const mockHandleFileChange = jest.fn();
const mockSetProductName = jest.fn();
const mockSetDescription = jest.fn();
const mockSetPrice = jest.fn();
const mockSetCategory = jest.fn();
const mockSetStock = jest.fn();
const mockHandleSubmit = jest.fn();

describe('AddProductForm', () => {
    test('handles form submission correctly', () => {
      
  
      // Render the component
     render(
     <Router>  
      <AuthProvider>

        <AddProductForm
          handleFileChange={mockHandleFileChange}
          setProductName={mockSetProductName}
          setDescription={mockSetDescription}
          setPrice={mockSetPrice}
          setCategory={mockSetCategory}
          setStock={mockSetStock}
          handleSubmit={mockHandleSubmit}
        />
    </AuthProvider>
</Router> 
      );
  
      // Simulate user interactions
      fireEvent.change(screen.getByLabelText('Product Name'), {
        target: { value: 'Test Product' },
      });
      fireEvent.change(screen.getByLabelText('Write Description'), {
        target: { value: 'Test Description' },
      });
      fireEvent.change(screen.getByLabelText('Specify Price'), {
        target: { value: '9.99' },
      });
      fireEvent.change(screen.getByLabelText('Category'), {
        target: { value: 'Test Category' },
      });
      fireEvent.change(screen.getByLabelText('Stock'), {
        target: { value: '10' },
      });
  
      // Simulate file upload
      const file = new File(['test image'], 'test.png', { type: 'image/png' });
      const fileInput =  screen.getByLabelText(/ProductImage/i)
      Object.defineProperty(fileInput, 'files', {
        value: [file],
      });
      fireEvent.change(fileInput);
  
      fireEvent.click(getByText('Post Product'));
  
      // Verify that the form submission functions were called with the correct values
      expect(mockHandleFileChange).toHaveBeenCalledTimes(1);
      expect(mockSetProductName).toHaveBeenCalledWith('Test Product');
      expect(mockSetDescription).toHaveBeenCalledWith('Test Description');
      expect(mockSetPrice).toHaveBeenCalledWith('9.99');
      expect(mockSetCategory).toHaveBeenCalledWith('Test Category');
      expect(mockSetStock).toHaveBeenCalledWith('10');
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
    });
  });