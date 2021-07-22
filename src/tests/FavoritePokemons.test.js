import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderwithRouter';
import App from '../App';

describe('Testing component FavoritePokemons.js', () => {
  it('has in the screen "No favorite pokemon found" if no pokemon was favorited', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFavorited = screen.getByText(/no favorite pokemon found/i);
    expect(notFavorited).toBeInTheDocument();
  });

  it('page have a favorited pokemons', () => {
    renderWithRouter(<App />);
    const clickDetails = screen.getByText(/more details/i);
    userEvent.click(clickDetails);

    const clickFavorite = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(clickFavorite);

    const goToFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(goToFavorite);

    const verifyFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(verifyFavorite).toBeInTheDocument();
  });
});
