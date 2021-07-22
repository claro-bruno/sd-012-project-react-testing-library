import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa links de App', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('O primeiro link deve existir e possuir o texto Home', () => {
    const linkAppHome = screen.getByRole('link', { name: /Home/i });
    expect(linkAppHome).toBeInTheDocument();
  });

  test('O segundo link deve existir e possuir o texto About', () => {
    const linkAppAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAppAbout).toBeInTheDocument();
  });

  test('O terceiro link deve existir e possuir o texto Favorite Pokémons', () => {
    const linkAppFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkAppFavorite).toBeInTheDocument();
  });
});

describe('Testa redirecionamento dos botões correspondetes aos links', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa redirecionamento do botão para o link Home', () => {
    const linkAppHome = screen.getByRole('link', { name: /Home/i });
    expect(linkAppHome).toBeInTheDocument();
  });

  test('Testa redirecionamento do botão para o link About', () => {
    const linkAppAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAppAbout).toBeInTheDocument();
  });

  test('Testa redirecionamento do botão para o link Favorites Pokémons', () => {
    const linkAppFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkAppFavorite).toBeInTheDocument();
  });
});
