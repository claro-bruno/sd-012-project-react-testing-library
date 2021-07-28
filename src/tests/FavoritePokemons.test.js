import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente FavoritePokemons.js', () => {
  test('Verifica a mensagem No favorite pokemon found, sem pokémons favoritos ', () => {
    renderWithRouter(<FavoritePokemons />);
    const pokemonMsg = screen.getByText('No favorite pokemon found');
    expect(pokemonMsg).toBeInTheDocument();
  });
  test('Testando se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const pokemonsDetails = screen.getByText('More details');
    userEvent.click(pokemonsDetails);
    const favoritePokemon = screen.getByText('Pokémon favoritado?');
    expect(favoritePokemon).toBeInTheDocument();
    const pokemonCheckBox = screen.getByRole('checkbox');
    userEvent.click(pokemonCheckBox);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorite);
    const favoritePName = screen.getByText('Pikachu');
    expect(favoritePName).toBeInTheDocument();
  });
});
