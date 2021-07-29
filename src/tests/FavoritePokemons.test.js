import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  beforeEach(() => {
    RenderWithRouter(<FavoritePokemons />);
  });

  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const favPokemons = screen.getByText(/no favorite pokemon found/i);
    expect(favPokemons).toBeDefined();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const pokeMock = [
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
    ];

    RenderWithRouter(<FavoritePokemons pokemons={ pokeMock } />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();
  });
});
