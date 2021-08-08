import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente App.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('O primeiro link deve possuir o texto Home.', () => {
    // acessar os elementos da tela
    const textHome = screen.getByText('Home');
    expect(textHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About', () => {
    const textAbout = screen.getByText('About');
    expect(textAbout).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const textFavoritePokémons = screen.getByText('Favorite Pokémons');
    expect(textFavoritePokémons).toBeInTheDocument();
  });
});

// interagir com eles se houver necessidade

// fazer teste
