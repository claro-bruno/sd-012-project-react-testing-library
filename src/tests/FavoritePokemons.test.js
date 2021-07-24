import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa Favorite Pokémon', () => {
  it('Testa se exibe No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);

    const paragraph = screen.getByText(/No favorite pokemon found/i);

    expect(paragraph).toBeInTheDocument();
  });

  it('Testa se renderiza Pokémon favorito', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favoritos = screen.getByText(/Favorite Pokémon/i);
    userEvent.click(favoritos);

    const pokemonFavorito = screen.getAllByTestId('pokemon-name');
    expect(pokemonFavorito.length).toBe(1);
  });
});
