import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testes para o componente Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(
    <Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite
    />,
    );
  });
  it('Testa se os dados do pokemon aparecem no card', () => {
    const { averageWeight, image, name} = pokemons[0];
    const { measurementUnit, value } = averageWeight;
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(`${name} sprite`);
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`)
    expect(pokeImage).toHaveAttribute('src', image);
  });
});
