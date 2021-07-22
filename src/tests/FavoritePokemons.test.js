import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemons/>', () => {
  test('Testa se é exibida a msg "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemons = screen.getByText('No favorite pokemon found');
    expect(noPokemons).toBeInTheDocument();
  });
});
