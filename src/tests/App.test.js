import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe(`Teste se o topo da aplicação contém um conjunto fixo
de links de navegação`, () => {
  it('O primeiro link deve possuir o texto Home', () => {
    const firstLink = screen.queryByRole('link', { name: /home/i });
    expect(firstLink).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    const firstLink = screen.queryByRole('link', { name: /about/i });
    expect(firstLink).toBeInTheDocument();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const firstLink = screen.queryByRole('link', { name: /favorite pokémons/i });
    expect(firstLink).toBeInTheDocument();
  });
});
