import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe('Testa o component FavoritePokemons.js', () => {
  beforeEach(() => {
    render(<FavoritePokemons />);
  });

  test('Testa se é exibido a mensagem No favorite pokemon found', () => {
    const message = screen.getByText(/No favorite/i);
    expect(message).toBeInTheDocument();
  });
});
