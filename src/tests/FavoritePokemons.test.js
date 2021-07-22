import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica FavoritePokemons.js found', () => {
  it('Verifica mensagem No favorite pokemon found, se não houver favoritados', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);

    const notFoundFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundFavorites).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pokemonFavoritado = screen.getByLabelText('Pokémon favoritado?');
    expect(pokemonFavoritado).toBeInTheDocument();
    userEvent.click(pokemonFavoritado);

    const clickFavoritePokemos = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(clickFavoritePokemos).toBeInTheDocument();
    userEvent.click(clickFavoritePokemos);
  });
});
