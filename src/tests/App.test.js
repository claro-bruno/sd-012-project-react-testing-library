import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import render from './renderWithRouter';

describe('Verifica topo da aplicação contém um conjunto de links de navegação.', () => {
  beforeEach(() => render(<App />));
  it('O Primeiro link deve possuir o texto "Home"', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
  });
  it('O segundo link deve possuir o texto "About".', () => {
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
  });
  it('O terceiro link deve possuir o texto "Favorite Pokémons".', () => {
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});
