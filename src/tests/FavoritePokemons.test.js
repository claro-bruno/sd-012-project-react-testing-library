import React from 'react';
import { screen, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente FavoritePokemons', () => {
  test('Testando se nao houver Pokemon Favorito', () => {
    render(<FavoritePokemons />);
    const messageDisplayed = screen.getByText('No favorite pokemon found');
    expect(messageDisplayed).toBeInTheDocument();
  });
  // test('Testando se é exibido exibido todos os cards de pokémons favoritados', () => {
  //  });
});
