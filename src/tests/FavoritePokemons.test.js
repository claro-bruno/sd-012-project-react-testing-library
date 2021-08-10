import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Favories from '../components/FavoritePokemons';
import App from '../App';
import render from './renderWithRouter';

describe('Verifica comportamento na tela de favoritos.', () => {
  it('Caso sem favoritos, é exibido a mensagem "No favorite pokemon found".', () => {
    render(<Favories />);
    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
  it('Exibe todos os cards de Pokémons favoritados.', () => {
    render(<App />);
    const pokeDetails = screen.getByText(/more details/i);
    fireEvent.click(pokeDetails);
    const markFavorite = screen.getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(markFavorite);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const favPokemon = screen.getByText(/pikachu/i);
    expect(favPokemon).toBeDefined();
  });
});
