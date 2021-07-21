import React from 'react';
import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('testa o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const mokePokemons = [
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
        summary: 'This intelligent ',
      },
    ];

    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mokePokemons),
    // });

    renderWithRouter(<Pokemon pokemons={ mokePokemons } />);

    const title = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(title).toBeInTheDocument();
  });

  // it('testa se a página contém uma imagem com link correto', () => {
  //   renderWithRouter(<Pokedex />);
  //   const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  //   const img = screen.getAllByRole('img');
  //   expect(img[1]).toBeInTheDocument();
  //   expect(img[1]).toHaveAttribute('src', imgURL);
  // });
});
