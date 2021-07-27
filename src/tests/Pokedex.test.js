import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import data from '../data';
import renderWithRouter from './renderWithRouter';
import mockIsPokemonFavoriteById from '../__mocks__/mockFavoritePokemonById';
import { Pokedex } from '../components';

describe('5 - Test component <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ mockIsPokemonFavoriteById }
    />);
  });

  it('5.1 - Test if has a <h2> tag with the message "Encountered pokémons"', () => {
    const h2Tag = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(h2Tag).toBeInTheDocument();
  });

  it('5.2 - Test if button "proximo pokemon" works', () => {
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    const currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeDefined();

    data.forEach((elem) => {
      const pokemon = screen.getByText(elem.name);
      expect(pokemon).toBeDefined();
      userEvent.click(btnNextPokemon);
    });

    expect(currentPokemon).toBeDefined();
  });

  it('5.3 - Show only one pokémon per time', () => {
    const pokemonByTestId = screen.getAllByTestId('pokemon-name');
    expect(pokemonByTestId).toHaveLength(1);
  });

  it('5.4 - Test if Pokédex has filter buttons', () => {
    const buttonAllTypes = screen.getByRole('button', { name: 'All' });
    const buttonLength = 7;
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    expect(allButtons).toHaveLength(buttonLength);

    data.forEach((elem) => {
      const button = screen.getByRole('button', { name: elem.type });
      expect(button).toBeDefined();
      expect(buttonAllTypes).toBeDefined();
    });
  });

  it('5.5 - Contains a button that reset filter', () => {
    const currentPokemon = screen.getByText('Pikachu');
    expect(currentPokemon).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByText('Charmander')).toBeDefined();
    userEvent.click(screen.getByRole('button', { name: /Próximo Pokémon/i }));
    expect(screen.getByText('Rapidash')).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(currentPokemon).toBeDefined();
  });
});
