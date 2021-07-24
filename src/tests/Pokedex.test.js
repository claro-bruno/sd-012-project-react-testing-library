import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';

const POKEMONS_MOCK = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
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
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
  },
];

const FAVORITES_MOCK = {
  25: true,
  4: true,
};

describe('Testa página Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(
      <Pokedex
        pokemons={ POKEMONS_MOCK }
        isPokemonFavoriteById={ FAVORITES_MOCK }
      />,
    );
  });

  it('Testa se tem o título na página', () => {
    const titulo = screen.getByRole('heading',
      { name: /Encountered Pokémons/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });

  it('Testa se o botão funciona', () => {
    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(botao.innerHTML).toBe('Próximo pokémon');
    fireEvent.click(botao);
    const charmandao = screen.getByText(/charmander/i);
    expect(charmandao).toBeInTheDocument();
    fireEvent.click(botao);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Testa se só tem um bicho na tela', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
});

describe('Testa os botões miseravi', () => {
  const filtros = [
    'All',
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  it('Testa os botões de filtro', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ data }
        isPokemonFavoriteById={ FAVORITES_MOCK }
      />,
    );

    filtros.forEach((filtro) => {
      const botao = screen.getByRole('button', { name: filtro });
      expect(botao.innerHTML).toBe(filtro);
      expect(botao).toBeInTheDocument();
    });

    const botaoAll = screen.getByRole('button', { name: 'All' });
    expect(botaoAll.innerHTML).toBe('All');
    expect(botaoAll).not.toHaveAttribute('disabled');
    fireEvent.click(botaoAll);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon.textContent).toBe('Pikachu');
  });
});
