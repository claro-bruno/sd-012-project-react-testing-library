import React from 'react';
import { /* render, */ screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1. Testa o componente <App.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se o topo contém um conjunto fixo de links de navegação.', () => {
    // const navLinks = screen.getAllByRole('link');
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoriteLink = screen.getByText('Favorite Pokémons');
    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoriteLink).toBeDefined();
    // falta verificar a ordem
  });
});
