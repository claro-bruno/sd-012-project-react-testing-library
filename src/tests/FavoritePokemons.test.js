import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste se é exibido na tela a mensagem No favorite pokemon found, [...]', () => {
  beforeEach(() => {
    renderWithRouter(<FavoritePokemons />);
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const paragraph = screen.getByText(/No favorite pokemon found/i);
    expect(paragraph).toBeInTheDocument();
  });
});
