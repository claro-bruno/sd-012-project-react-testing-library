import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const mockPokemon = [{
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
  summary: 'This intelligent Pokémon roasts hard berries eat.',
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
  summary: 'The flame  its life force. If it is weak, burns weakly.',
}];

const favorites = {
  25: true,
  4: true,
};

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemon } isPokemonFavoriteById={ favorites } />,
    );
    const heading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });
  test('Se é exibido o prox Pokémon da lista quando o botão Próximo pokémon é clicado.',
    () => {
      renderWithRouter(
        <Pokedex pokemons={ mockPokemon } isPokemonFavoriteById={ favorites } />,
      );
      const button = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });

      expect(button.innerHTML).toBe('Próximo pokémon');

      fireEvent.click(button);
      const charmander = screen.getByText(/charmander/i);

      expect(charmander).toBeInTheDocument();

      fireEvent.click(button);
      const pikachu = screen.getByText(/pikachu/i);
      expect(pikachu).toBeInTheDocument();
    });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemon } isPokemonFavoriteById={ favorites } />,
    );
    const poke = screen.getAllByTestId('pokemon-name');
    expect(poke.length).toBe(1);
  });
  test('Teste se a Pokedéx contém um botão para resetar o filtro.', () => {
    renderWithRouter(
      <Pokedex pokemons={ mockPokemon } isPokemonFavoriteById={ favorites } />,
    );
    const button = screen.getByRole('button', {
      name: /All/i,
    });
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pikachu = screen.getByText(/pikachu/i);

    expect(button).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();

    fireEvent.click(button);

    expect(pikachu).toBeInTheDocument();

    fireEvent.click(nextButton);
    const charmander = screen.getByText(/charmander/i);

    expect(charmander).toBeInTheDocument();
  });
  test('Testa se tem filtros', () => {
    renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ favorites } />,
    );
    const filtros = ['All',
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    filtros.forEach((filtro) => {
      const button = screen.getByRole('button', { name: filtro });
      expect(button.innerHTML).toBe(filtro);
      expect(button).toBeInTheDocument();
    });
  });
});
