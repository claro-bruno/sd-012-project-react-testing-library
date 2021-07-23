import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';

describe('Testa o componente <Favorite.js />.', () => {
  test('Testa se a página renderiza uma mensagem caso não haja pokemon', () => {
    render(<Favorite />);
    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });
});
