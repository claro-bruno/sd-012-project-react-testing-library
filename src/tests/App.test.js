import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderwithRouter';

describe('Testing component App.js', () => {
  it('verify link in Nav have a text "Home" and redirect to "/"', () => {
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const { history } = renderWithRouter(<App />);
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  it('verify link in Nav have a text "About" and redirect to "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  it('verify link in Nav have a text "Favorite Pokemons" and redirect to "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
      expect(linkFavorite).toBeInTheDocument();
      userEvent.click(linkFavorite);
      expect(history.location.pathname).toBe('/favorites');
    });
});
