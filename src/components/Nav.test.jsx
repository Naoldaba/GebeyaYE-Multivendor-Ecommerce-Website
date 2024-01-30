import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent } from '@testing-library/dom';
import Nav from './Nav';

describe('Nav', () => {
  test('renders the logo correctly', () => {
    render(<Nav />, { wrapper: MemoryRouter });
    
    const logoText = screen.getByText('Gebeyaዬ');
    const logoSubText = screen.getByText('ሱቅ ከእልፍኜ');

    expect(logoText).toBeInTheDocument();
    expect(logoSubText).toBeInTheDocument();
  });


})

 
