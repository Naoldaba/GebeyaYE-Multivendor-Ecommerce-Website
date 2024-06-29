import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';



import Footer from './Footer';

describe('Footer', () => {
  test('renders all the footer links correctly', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    expect(screen.getByText('How to Buy')).toBeInTheDocument();
    expect(screen.getByText('Delivery')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
  });

  test('renders social media icons correctly', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );

    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('telegram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('youtube-icon')).toBeInTheDocument();
    expect(screen.getByTestId('gmail-icon')).toBeInTheDocument();
  });
});