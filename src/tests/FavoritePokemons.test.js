import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorite from '../components/FavoritePokemons';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<Favorite />);
    const paragraph = screen.getByText('No favorite pokemon found');
    expect(paragraph).toBeInTheDocument();
  });
});
