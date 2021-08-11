import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  it('testa se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    pokemons.forEach((pokemon) => {
      const { name, type, averageWeight } = pokemon;
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight)
        .toHaveTextContent(
          `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
        );
      fireEvent.click(nextPokemonBtn);
    });
  });
});
