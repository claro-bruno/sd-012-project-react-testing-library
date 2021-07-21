import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('Requisito 3 - Teste o componente <FavoritePokemons.js /> ', () => {
  it(`Testa se a mensagem "No favorite pokemon found" é exibida 
  caso não haja favorito`, () => {
    render(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon/i)).toBeInTheDocument();
  });
  it('Testa se é exibido os cards dos pokémons favotitados', () => {
    const mockPokemons = [
      {
        id: 25,
        name: 'Pikachu',
        type: 'Eletric',
        averageWeight: {
          measurementUnit: 'kg',
          value: '6.0',
        },
        image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
      },
      {
        id: 4,
        name: 'Charmander',
        type: 'Fire',
        averageWeight: {
          measurementUnit: 'kg',
          value: '8.5',
        },
        image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ mockPokemons } />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
