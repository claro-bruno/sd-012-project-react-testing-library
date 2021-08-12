import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa os componente de App.js', () => {
  test('Verifica se o primeiro link possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();
  });

  test('Verifica se o segundo link possui o texto "About"', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();
  });

  test('Verifica se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeDefined();
  });

  test('Testa se a aplicação é redirecionada à página inicial ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();
    userEvent.click(home);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada à página about ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();
    userEvent.click(about);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('Testa se Favorite Pokémons redireciona à página de Pokémons Favoritados', () => {
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
