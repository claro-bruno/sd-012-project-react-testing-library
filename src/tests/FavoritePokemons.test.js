import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa os pokemóns favoritos', () => {
  it('Se a pessoa não tiver pokemóns, deverá mostrar uma mensagem', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokesText = screen.getByText(/No favorite pokemon found/i);
    expect(noPokesText).toBeInTheDocument();
  });
  it('Quando favorita um pokémon, deverá mostrar o card na tela', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByText(/more details/i);
    fireEvent.click(pokeDetails);
    const markFavorite = screen.getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(markFavorite);
    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);
    const chosenPokemon = screen.getByText(/pikachu/i);
    expect(chosenPokemon).toBeDefined();
  });
});
