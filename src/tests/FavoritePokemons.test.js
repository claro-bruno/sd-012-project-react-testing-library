import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';

describe('Testa componente FavoritePokemons', () => {
  it('Verifica mensagem quando não há favoritos', () => {
    renderWithRouter(<App />);

    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    fireEvent.click(favLink);

    const pokemons = screen.queryAllByRole('Pokemon');

    if (pokemons.length === 0) {
      const noFavMessage = screen.getByText(
        /No favorite pokemon found/i,
        { exact: false },
      );
      expect(noFavMessage).toBeInTheDocument();
    }
  });

  it('Renderiza pokemons favoritos', () => {
    const pokemons = screen.queryAllByRole('Pokemon');

    if (pokemons.length > 0) {
      const timesCalled = pokemons.length;

      expect(<Pokemon />).toHaveBeenCalledTimes(timesCalled);
    }
  });
});
