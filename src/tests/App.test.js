import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente App', () => {
  test('Testa o link home', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Home' });
    expect(linkToHome).toBeInTheDocument();
    fireEvent.click(linkToHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa o link about', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'About' });
    expect(linkToHome).toBeInTheDocument();
    fireEvent.click(linkToHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa o link favorites', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkToHome).toBeInTheDocument();
    fireEvent.click(linkToHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
