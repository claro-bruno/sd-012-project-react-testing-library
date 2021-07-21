import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica roteamentos da aplicação', () => {
  it('Quando clicamos no link "Home" a URL se torna "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeLink);
    const headingTitle = screen.getByRole('heading', { level: 2 });
    const { pathname } = history.location;
    expect(pathname).toBe('/');
    expect(headingTitle.innerHTML).toBe('Encountered pokémons');
  });
  it('Quando clicamos no link "Favorite Pokémons" a URL se torna "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritesLink);
    const headingTitle = screen.getByRole('heading', { level: 2 });
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(headingTitle.innerHTML).toBe('Favorite pokémons');
  });
});
