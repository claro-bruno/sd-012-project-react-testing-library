import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWhithRouter from './renderWhithRouter.test';

describe('Teste o componente Favorite Pokemons', () => {
  beforeEach(() => {
    renderWhithRouter(<FavoritePokemons />);
  });
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const message = screen.getByText(/No favorite pokemon found/i);
    expect(message).toBeDefined();
  });
});
// Feito com ajuda do Wadson!
