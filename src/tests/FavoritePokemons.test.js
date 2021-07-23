import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../etc/renderWithRouter';

describe('FavoritePokemons.js', () => {
  it('Not Found', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);
    expect(msg).toBeInTheDocument();
  });

  it('Favoritos', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/More details/i);
    userEvent.click(details);
    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);
    const favorites = screen.getByText(/favorite/i);
    userEvent.click(favorites);
    const favoritesArray = screen.getAllByTestId('pokemon-name');
    expect(favoritesArray.length).toBe(1);
  });
});
