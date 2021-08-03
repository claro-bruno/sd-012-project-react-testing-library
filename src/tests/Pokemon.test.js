import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import mockFavPokemonById from '../helpers/mockIsFavoritePokemonById';
import pokemons from '../data';

describe('Tests Pokemon.js', () => {
  const pokemon = pokemons[0];
  const { name, type, id, image, averageWeight: { value, measurementUnit } } = pokemon;
  let history;
  beforeEach(() => {
    history = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ mockFavPokemonById[id] }
      />,
    ).history;
  });

  it('tests if a pokemon card is rendered correctly', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen
      .getByRole('img', { name: `${pokemonName.textContent} sprite` });

    expect(pokemonName && pokemonType && pokemonWeight).toBeDefined();
    expect(pokemonName.textContent).toStrictEqual(name);
    expect(pokemonType.textContent).toStrictEqual(type);
    expect(pokemonWeight.textContent)
      .toStrictEqual(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage.src).toStrictEqual(image);
    expect(pokemonImage.alt).toStrictEqual(`${pokemonName.textContent} sprite`);
  });

  it('tests if there is a link to details about that pokemon ', () => {
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails.href).toBe(`http://localhost/pokemons/${id}`);
    let currentURL = history.location.pathname;
    expect(currentURL).toBe('/');
    userEvent.click(linkDetails);
    currentURL = history.location.pathname;
    expect(currentURL).toBe(`/pokemons/${id}`);
  });

  it('tests if the current pokemon is favorited or not', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonImage = screen
      .getByRole('img', { name: `${pokemonName.textContent} is marked as favorite` });

    expect(pokemonImage.src).toStrictEqual('http://localhost/star-icon.svg');
    expect(pokemonImage.alt)
      .toStrictEqual(`${pokemonName.textContent} is marked as favorite`);
  });
});
