import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Verifica o componente FavoritePokemons.test.js', () => {
  test('Verifica se é exibido: "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
});
