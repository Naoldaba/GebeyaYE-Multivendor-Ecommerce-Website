import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchWithDropdown from './SearchWithDropdown';

describe('SearchWithDropdown', () => {
  

  test('updates state when select and input values change', () => {
    render(<SearchWithDropdown setProducts={() => {}} />);
    
    const selectElement = screen.getByRole('combobox');
    const inputElement = screen.getByRole('searchbox');

    userEvent.selectOptions(selectElement, 'Electronics');
    userEvent.type(inputElement, 'Laptop');

    // Assert that the state values are updated
    expect(selectElement.value).toBe('Electronics');
    expect(inputElement.value).toBe('Laptop');
  });
});