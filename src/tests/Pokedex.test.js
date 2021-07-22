import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';
import App from '../App';

describe('Testa Pokedex', () => {
  test('Verifica se a página contém um h2', () => {
    renderWithRouter(<App />);
    const h1 = screen.getAllByRole('heading')[1];
    const TEXT = /Encountered pokémons/i;
    expect(h1).toHaveTextContent(TEXT);
  });
});
