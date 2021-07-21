import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica se exist os links do App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se tem o link Home no Dom', () => {
    const linkApp = screen.getByRole('link', { name: /Home/i });
    expect(linkApp).toBeInTheDocument();
  });

  test('Testa se tem o link About no Dom', () => {
    const linkApp = screen.getByRole('link', { name: /About/i });
    expect(linkApp).toBeInTheDocument();
  });

  test('Testa se tem o link Favorite Pokémons no Dom', () => {
    const linkApp = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkApp).toBeInTheDocument();
  });
});

describe('Verifica se ao clicar nos botoes, corresponde aos links do App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se o botao redireciona para o link Home no Dom', () => {
    const linkApp = screen.getByRole('link', { name: /Home/i });
    expect(linkApp).toBeInTheDocument();
  });

  test('Testa se o botao redireciona para o link About no Dom', () => {
    const linkApp = screen.getByRole('link', { name: /About/i });
    expect(linkApp).toBeInTheDocument();
  });

  test('Testa se o botao redireciona para o link Favorite Pokémons no Dom', () => {
    const linkApp = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkApp).toBeInTheDocument();
  });
});
