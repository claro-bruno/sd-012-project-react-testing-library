// esse código foi baseado no PR de Eric Alfino Kreis: https://github.com/tryber/sd-012-project-react-testing-library/pull/48/files
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

import pokemons from '../data';

const favPokemonsMock = pokemons
  .filter(({ name }) => name === 'Pikachu' || name === 'Caterpie');

describe('FavoritePokemons tests', () => {
  it('Mensagem "No favorite pokemon found" no documento', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundMsg = screen.getByText(/No favorite pokemon found/i);

    expect(notFoundMsg).toBeInTheDocument();
  });

  it('Quando houver pokemons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favPokemonsMock } />);

    const pikachuImg = screen.getByRole('img', { name: /pikachu sprite/i });
    const caterpieImg = screen.getByRole('img', { name: /caterpie sprite/i });

    expect(pikachuImg).toBeInTheDocument();
    expect(caterpieImg).toBeInTheDocument();
  });
});
