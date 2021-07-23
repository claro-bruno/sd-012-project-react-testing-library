import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './RenderWithRouter';

describe('Testando o componente "FavoritePokemons"', () => {
  it('Testa se exibido na tela a mensagem "No favorite pokemon find"', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFavorites = screen.getByText(/No favorite pokemon found/i);
    expect(notFavorites).toBeDefined();
  });
});
