import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
  test('Verifica os três primeiros links de Navegação', () => {
    renderWithRouter(<App />);
    // pelo getAllByRole
    const linksApp = screen.getAllByRole('link');
    const [home, about, favorite] = linksApp;

    // pelo getByRole
    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    // expect pelo toHaveContent
    expect(home).toHaveTextContent(/home/i);
    expect(about).toHaveTextContent(/about/i);
    expect(favorite).toHaveTextContent(/favorite pokémons/i);

    // expect pelo toBeInTheDocument
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });
  test('Verifica o click do link Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    event.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  test('Verifica o click do link About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
    event.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test('Verifica o click do link Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
    event.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
