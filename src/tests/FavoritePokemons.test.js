import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../components/RenderWithRouter';

describe('Testa os pokemóns favoritos', () => {
  it('Quando favoritar um pokémon, deverá mostrar o card na tela', () => {
    renderWithRouter(<App />);
    const pokeDetails = screen.getByText(/more details/i);
    fireEvent.click(pokeDetails);

    const selectFavorite = screen.getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(selectFavorite);

    const favoritesLink = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favoritesLink);

    const choosePokemon = screen.getByText(/pikachu/i);
    expect(choosePokemon).toBeDefined();
  });

  it('Se a pessoa não tiver pokemóns, deverá mostrar uma mensagem', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokesMessage = screen.getByText(/No favorite pokemon found/i);
    expect(noPokesMessage).toBeInTheDocument();
  });
});
