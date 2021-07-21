import React from 'react';
import Pokemon from '../components/Pokemon';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import data from '../data';

describe("Tests for Pokemon component.", () => {
  it("Test if renders the pokecard.", () => {
    const mockPokemon = data[0];

    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ true } />);
    const pokemonName = screen.getByTestId(/pokemon-name/i);
    const pokemonType = screen.getByTestId(/pokemon-type/i);
    const pokemonWeight = screen.getByTestId(/pokemon-weight/i);
    const pokemonImgs = screen.getAllByRole(/img/i);

    expect(pokemonName).toHaveTextContent(mockPokemon.name);
    expect(pokemonType).toHaveTextContent(mockPokemon.type);
    expect(pokemonWeight).toHaveTextContent(`Average weight: ${mockPokemon.averageWeight.value} ${mockPokemon.averageWeight.measurementUnit}`)
    expect(pokemonImgs[0]).toHaveProperty('src', mockPokemon.image);
    expect(pokemonImgs[0]).toHaveProperty('alt', `${mockPokemon.name} sprite`);
    expect(pokemonImgs[1]).toHaveProperty('alt', `${mockPokemon.name} is marked as favorite`)
    expect(pokemonImgs[1]).toHaveProperty('src', 'http://localhost/star-icon.svg')
  });

  it('Test if the card has a nav link to show pokemon details working correctly.', () => {
    const mockPokemon = data[0];

    const { history } = renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite={ false } />)
    const detailsLink = screen.getByRole(/link/i, { name: /more details/i });

    expect(detailsLink).toBeDefined();

    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockPokemon.id}`)
    const pokemonText = screen.findByText(`${mockPokemon.name} Details`);
    expect(pokemonText).toBeDefined()
  });
});