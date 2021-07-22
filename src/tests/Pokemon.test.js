import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Teste o componente <Pokemon.js />', () => {
  const pokemon = pokemons[0];

  it('Teste se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const testNum = pokemon.averageWeight.value;
    const testUnit = pokemon.averageWeight.measurementUnit;
    const testWeight = `Average weight: ${testNum} ${testUnit}`;
    const img = screen.getAllByRole('img');

    expect(name).toHaveTextContent(pokemon.name);
    expect(type).toHaveTextContent(pokemon.type);
    expect(img[0]).toHaveAttribute('src', pokemon.image);
    expect(img[0]).toHaveAttribute('alt', `${pokemon.name} sprite`);
    expect(weight).toHaveTextContent(testWeight);
  });

  it('Teste se existe um link More Details', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  it('Teste se existe um icone Favorito', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const img = screen.getAllByRole('img');
    expect(img[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(img[1]).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
  });
});
