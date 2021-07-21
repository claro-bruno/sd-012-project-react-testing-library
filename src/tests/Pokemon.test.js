import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa Pokemon', () => {
  test('Testa se as informações aparecem', () => {
    const pokemon = pokemons[0];
    const { name, image, averageWeight } = pokemon;
    const { measurementUnit, value } = averageWeight;
    const avgWeight = `Average weight: ${value} ${measurementUnit}`;
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonName).toHaveTextContent(pokemon.name);
    expect(pokemonType).toHaveTextContent(pokemon.type);
    expect(pokemonWeight).toHaveTextContent(avgWeight);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(`${image}`);
  });

  test('Testa link', () => {
    const pokemon = pokemons[0];
    const { id } = pokemon;
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
    />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa favoritados', () => {
    const pokemon = pokemons[0];
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
    />);
    const star = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
