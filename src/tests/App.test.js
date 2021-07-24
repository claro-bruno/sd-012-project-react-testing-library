import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa App.js', () => {
  test('Testa se há textos Home, About e Favorite Pokémons na tela', () => {
    renderWithRouter(<App />);

    const homeText = screen.getByText(/home/i);
    expect(homeText).toBeDefined();

    const aboutText = screen.getByText(/about/i);
    expect(aboutText).toBeDefined();

    const favoritePokemonText = screen.getByText(/favorite pokémons/i);
    expect(favoritePokemonText).toBeDefined();
  });

  test('Testa link Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa link About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/about/i);
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByText(/favorite pokémons/i);
    userEvent.click(favoritePokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
