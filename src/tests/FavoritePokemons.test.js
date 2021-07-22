import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

beforeEach(() => {
  renderWithRouter(<FavoritePokemons />);
});

describe('Teste componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const message = screen.getByText(/no favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });
});
