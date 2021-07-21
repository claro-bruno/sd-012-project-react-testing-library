import React from 'react';
import { render, screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o componente favorite pokemons', () => {
  test('Verifica se é exibida a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);
    const p = screen.getByText(/No favorite Pokemon found/i);
    expect(p.innerHTML).toBe('No favorite pokemon found');
  });
});
