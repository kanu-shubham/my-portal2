import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer from './Footer';

// Mock the current year to ensure consistent testing
const mockDate = new Date('2024-01-01T00:00:00Z');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('Footer', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  test('renders the About Us section', () => {
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Our Story')).toHaveAttribute('href', '/about');
  });

  test('renders the Support section', () => {
    expect(screen.getByText('Support')).toBeInTheDocument();
    expect(screen.getByText('FAQ')).toHaveAttribute('href', '/faq');
  });

  test('renders the Legal section', () => {
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toHaveAttribute('href', '/terms');
  });

  test('renders the Connect section', () => {
    expect(screen.getByText('Connect')).toBeInTheDocument();
    const twitterLink = screen.getByText('Twitter');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders the copyright information', () => {
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`Copyright © Your Perfect Freelancer Platform ${currentYear}.`, { exact: false })).toBeInTheDocument();
  });

  test('copyright link points to the correct website', () => {
    const copyrightLink = screen.getByText('Your Perfect Freelancer Platform');
    expect(copyrightLink).toHaveAttribute('href', 'https://yourwebsite.com/');
  });

  test('all internal links use RouterLink', () => {
    const internalLinks = ['Our Story', 'FAQ', 'Terms of Service'];
    internalLinks.forEach(linkText => {
      const link = screen.getByText(linkText);
      expect(link.tagName).toBe('A');
      expect(link).not.toHaveAttribute('target');
    });
  });

  test('external link opens in a new tab', () => {
    const externalLink = screen.getByText('Twitter');
    expect(externalLink).toHaveAttribute('target', '_blank');
    expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});