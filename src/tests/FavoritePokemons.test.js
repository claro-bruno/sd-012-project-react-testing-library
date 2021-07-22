import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

const pokemonMock = [
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
];
describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found, [...]', () => {
    renderWithRouter(<FavoritePokemons />);
    const paragraph = screen.getByText(/No favorite pokemon found/i);
    expect(paragraph).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemonMock } />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    // Refatorei esse trecho do código, pq me senti culpado moralmente.
    // Não sei se era pra eu simular o usúario com "UserEvent" ou mockar a props do pokemon
    // mas espero ter feito certo...
  });
});
