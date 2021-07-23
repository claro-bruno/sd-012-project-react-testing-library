import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testes do componente App.js', () => {
  test('Verifica se existe um link "Home"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();
  });

  test('Testa se "Home" redireciona para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();
    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Verifica se existe um link "About"', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();
  });

  test('Testa se "About" redireciona para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Verifica se existe um link "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeDefined();
  });

  test('Testa se "Favorite Pokémons" redireciona para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeDefined();
    userEvent.click(favorite);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se "/page-not-found" redireciona para pagina "Not Found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/page-not-found');
    const pageNotFound = screen.getByText('Page requested not found');
    expect(pageNotFound).toBeDefined();
  });
});
