import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa renderização da página FavoritePokemons', () => {
  it('Testa se a frase No favorite pokemon found é renderizada', () => {
    renderWithRouter(<App />);
    const favoritePageLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePageLink);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeDefined();
  });

  it('Testa se renderiza os favoritos', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    userEvent.click(detailsLink);
    const addToFavorites = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(addToFavorites);
    const linkToFavoritesPage = screen.getByText('Favorite Pokémons');
    userEvent.click(linkToFavoritesPage);
    const favoritePokemon = screen.getByAltText(/is marked as favorite/i);
    expect(favoritePokemon).toBeDefined();
  });
});
