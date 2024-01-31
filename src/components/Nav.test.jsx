import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import Nav from './Nav';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Nav', () => {
  test('renders the logo correctly', () => {
    render(
      <Router>
        <AuthProvider>
          <Nav />
        </AuthProvider>
      </Router>
    );

    const logoText = screen.getByText('Gebeyaዬ');
    const logoSubText = screen.getByText('ሱቅ ከእልፍኜ');

    expect(logoText).toBeInTheDocument();
    expect(logoSubText).toBeInTheDocument();
  });
});