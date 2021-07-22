import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';

const mockPokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: {
      value: '6.9',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
  },
  {
    id: 65,
    name: 'Alakazam',
    type: 'Psychic',
    averageWeight: {
      value: '48.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  },
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  },
];
const mockFavorite = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const mockTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

describe('Teste do componente Pokedex.js', () => {
  test('Teste de renderização do heading', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavorite } />,
    );
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste de funcionamento do botão "Próximo pokemon"', () => {
    const pokemonNames = mockPokemons.map((pokemon) => pokemon.name);
    renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavorite } />,
    );
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();

    pokemonNames.forEach((name, index) => {
      fireEvent.click(nextButton);
      let pokemonName = '';
      if (index < pokemonNames.length - 1) {
        pokemonName = screen.getByText(pokemonNames[index + 1]);
      } else {
        pokemonName = screen.getByText(pokemonNames[0]);
      }
      expect(pokemonName).toBeInTheDocument();
    });
  });

  test('Teste de renderização de somente um Pokemon por vez', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavorite } />,
    );
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
  });

  test('Teste de funcionamento dos botões de filtro', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavorite } />,
    );

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(mockTypes.length);

    const typeButton = screen.getByRole('button', { name: /Psychic/i });
    fireEvent.click(typeButton);
    const pokemonName = screen.getByText('Alakazam');
    expect(pokemonName).toHaveTextContent('Alakazam');

    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
  });

  test('Teste de funcionamento do botão "All"', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavorite } />,
    );
    const allButton = screen.getByRole('button', { name: /All/i });
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toHaveTextContent('Pikachu');
  });
});
