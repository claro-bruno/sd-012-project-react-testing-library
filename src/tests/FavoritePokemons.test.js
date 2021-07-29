import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testes do <FavoritePokemons />', () => {
  test('Testa se é exibido msg, se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const msg = screen.getByText(/No favorite pokemon found/i);

    expect(msg).toBeInTheDocument();
  });

  test('Testa se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkMoreDetails);
    const pokemonFavoritado = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(pokemonFavoritado);
    const linkFavoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(linkFavoritePokemon);

    const pokemon = screen.getByText(/Pikachu/i);

    expect(pokemon).toBeInTheDocument();
  });
});
