import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Verifica o componente "Pokedex.js"', () => {
  test('Verifica se contém a tag "h2" com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const h2Title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2Title).toBeInTheDocument();
  });

  // test('Verifica o próximo pokémon ao ser clicado o botão', () => {
  //   renderWithRouter(<App />);
  // })
});
