import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithrouter';

describe('Verifica App.js', () => {
  test('Testa conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavoritePokemon).toBeInTheDocument();
  });

  test('Testa link Home redireciona para URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa link About redireciona para URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa link Home redireciona para URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
