import { screen } from '@testing-library/react';
import React from 'react';
// import { Pokedex } from '../components';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Test "Pokedex" components', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Tests if page contains text "Encountered pokémons"', () => {
    const h2Element = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(h2Element).toBeInTheDocument();
  });

  it('Tests if is shown next Pokémon, when "Próximo pokémon" is clicked', () => {
    const nextPokemonButton = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });

    userEvent.click(nextPokemonButton);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('Tests if is shown just one Pokémon at a time', () => {
    expect(screen.getAllByTestId('pokemon-name').length).toBe(1);
  });

  it('Tests if Pokedex has filter button', () => {
    const allPokemonButton = screen.getByRole('button', {
      name: /All/,
    });

    const pokemonName = [
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];

    const nextPokemonButton = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });

    userEvent.click(allPokemonButton);

    pokemonName.forEach((pokemon) => {
      userEvent.click(nextPokemonButton);
      expect(screen.getByText(pokemon)).toBeInTheDocument();
    });
  });

  it('Tests if Pokedex has a reset filter button', () => {
    const bugPokemonButton = screen.getByRole('button', {
      name: /Bug/,
    });
    const nextPokemonButton = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });

    userEvent.click(bugPokemonButton);
    expect(screen.getByText(/Caterpie/i)).toBeInTheDocument();
    expect(nextPokemonButton).toBeDisabled();
  });

  it('Tests if "Próximo Pokemon Button is disabled when has just 1 pokemon"', () => {
    const pokeType = screen.getAllByTestId('pokemon-type-button');
    expect(pokeType).toBeDefined();
  });
});
