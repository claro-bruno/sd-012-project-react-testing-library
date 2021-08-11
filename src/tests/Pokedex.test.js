import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokedex.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingH2 = screen.getByText('Encountered pokémons');
    expect(headingH2).toBeInTheDocument();
    expect(headingH2.tagName).toBe('H2');
  });
});
