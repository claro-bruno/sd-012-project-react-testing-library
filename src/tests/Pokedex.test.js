import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Requisito 5 - Testa o componenete <Pokedex />', () => {
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = false;
    return acc;
  }, {});

  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
  });

  it('Testa se há um <h2> com o texto "Encountered pokémons"', () => {
    const takeH2 = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(takeH2).toBeInTheDocument();
  });

  it('Testa se há um botão com o texto "Próximo pokémon"', () => {
    const takeBtn = screen.getByTestId('next-pokemon');
    const btnText = takeBtn.textContent;

    expect(takeBtn).toBeInTheDocument();
    expect(btnText).toBe('Próximo pokémon');
  });
});
