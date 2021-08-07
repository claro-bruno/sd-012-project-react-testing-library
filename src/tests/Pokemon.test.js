import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa componente Pokemon', () => {
  test('Testa o card do pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite="false"
    />);
    const { name, type, averageWeight, image } = pokemons[0];
    const { measurementUnit, value } = averageWeight;
    const avgWeight = `${value} ${measurementUnit}`;
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(`${name} sprite`);
    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent((`Average weight: ${avgWeight}`));
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage.src).toBe(`${image}`);
  });

  test('Testa link para pokemon details', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite="false"
    />);
    const link = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Testa componente pokemon com pokemon favoritado', () => {
    const { name } = pokemons[0];
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite="true"
    />);
    const starImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();
    expect(starImage.src).toBe('/star-icon.svg');
  });
});
