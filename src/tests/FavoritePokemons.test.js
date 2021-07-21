import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons />', () => {
  it('Testa mensagem se não houver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const resposta = screen.getByText('No favorite pokemon found');
    expect(resposta).toBeInTheDocument();
  });

  it('Testa se os cards dos pokémons favoritados são exibidos', () => {
    const pokemonsFavs = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Electric',
        averageWeight: { value: '6.0', measurementUnit: 'kg' },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
        moreInfo:
          'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
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
        summary:
          'This intelligent Pokémon'
          + 'roasts hard berries with electricity to make them tender enough to eat.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavs } />);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();

    const weigth = screen.getByTestId('pokemon-weight');
    expect(weigth).toBeInTheDocument();
  });
});
