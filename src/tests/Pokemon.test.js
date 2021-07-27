import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const mockTestPokemon = data[2];

describe('6 - Test component <Pokemon.js />', () => {
  it('6.1 - Test if render a pokemon details card.', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockTestPokemon }
      isFavorite={ false }
      showDetailsLink
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = mockTestPokemon.averageWeight;
    const pokemonImage = screen
      .getByRole('img', { name: `${mockTestPokemon.name} sprite` });

    expect(pokemonName).toContainHTML(mockTestPokemon.name);
    expect(pokemonType).toContainHTML(mockTestPokemon.type);
    expect(pokemonWeight).toContainHTML(`Average weight: ${value} ${measurementUnit}`);

    expect(pokemonImage).toHaveProperty('src', mockTestPokemon.image);
  });

  it('6.2 - Test pokemon pathname', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockTestPokemon }
      isFavorite={ false }
      showDetailsLink
    />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeDefined();
    const link = `/pokemons/${mockTestPokemon.id}`;
    expect(detailsLink.href.endsWith(link)).toBeTruthy();
  });

  it('6.3 - Test detail`s link', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ mockTestPokemon }
      isFavorite
      showDetailsLink
    />);
    const linkToDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkToDetails).toBeDefined();
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toBe(`/pokemons/${mockTestPokemon.id}`);
  });

  it('6.4 - Show favorite pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ mockTestPokemon }
      isFavorite
      showDetailsLink
    />);
    const alternativeText = `${mockTestPokemon.name} is marked as favorite`;
    const favoritePokemon = screen.getByRole('img', { name: alternativeText });
    expect(favoritePokemon).toBeDefined();
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
