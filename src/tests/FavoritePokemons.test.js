import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Favorite from '../components/FavoritePokemons';

describe('Teste do componente FavoritePokemons.js', () => {
  test('Teste se é exibido uma mensagem, quando não tiver pokémons favoritos.', () => {
    renderWithRouter(<Favorite />);
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<Favorite />);
    const found = screen.getByText('Favorite pokémons');
    expect(found).toBeInTheDocument();
  });
});
