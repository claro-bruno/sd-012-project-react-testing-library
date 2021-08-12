import React from 'react';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper';

import Pokedex from '../components/Pokedex';

import pokemons from '../data';

const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
  acc[pokemon.id] = false;
  return acc;
}, {});

describe('Testa componente Pokedex', () => {
  it('Should render with a h2 title', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const title = screen.getByRole(
      'heading', { name: 'Encountered pokémons', level: 2 },
    );
    expect(title).toBeInTheDocument();
  });

  it('Should jump to next pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const nextBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextBtn).toBeInTheDocument();
    pokemons.forEach((e) => {
      const pokemonNames = screen.getByTestId('pokemon-name');
      expect(pokemonNames).toBeInTheDocument();
      expect(pokemonNames.textContent).toBe(e.name);
      userEvent.click(nextBtn);
    });
  });

  it('Should be just one pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
    expect(pokemon[0]).toBeInTheDocument();
  });

  it('Should be all buttons of types', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavorite }
    />);
    const filt = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];
    filt.forEach((e, index) => {
      const filterButton = screen.getAllByTestId('pokemon-type-button')[index];
      expect(filterButton.textContent).toBe(e);
      userEvent.click(filterButton);
      const button = screen.getByRole('button', { name: 'Próximo pokémon' });
      const pokemonTypes = screen.getByTestId('pokemon-type');
      userEvent.click(button);
      expect(pokemonTypes.textContent).toBe(e);
      expect(pokemonTypes).toBeInTheDocument();
    });
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    const pokemonNames = screen.getByTestId('pokemon-type');
    expect(pokemonNames.textContent).toBe('Electric');
    expect(pokemonNames).toBeInTheDocument();
  });
});
