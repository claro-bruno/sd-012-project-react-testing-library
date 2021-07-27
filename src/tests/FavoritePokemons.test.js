import React from 'react';
import { screen, render } from '@testing-library/react';
// import * as FavoritePokemons from '../components/FavoritePokemons';
import { FavoritePokemons } from '../components';


describe('Testa o componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
if(FavoritePokemons.isEmpty) {
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
// } else {
//     expect(screen.getAllByText('favorite-pokemons')).toBeDefined();
}
  });
});
