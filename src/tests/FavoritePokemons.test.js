import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('3 - Testa o componente <FavoritePokemons.js />', () => {
  it('Verifica se é exibido na tela a mensagem No favorite pokemon found,'
      + 'se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundParagraph = 'No favorite pokemon found';
    expect(screen.getByText(notFoundParagraph)).toBeInTheDocument();
  });

  /* it('Verifica se é exibido todos os cards de pokémons favoritados', () => {
  }); */
});
