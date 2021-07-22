import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa App.js', () => {
  it('Existe link com o texto "Home"', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();
  });

  it('Link "Home" redireciona para a URL "/"', () => {
    const { history } = renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('Existe um link com o texto "About"', () => {
    renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();
  });

  it('Link "About" redireciona para a URL "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Existe um link com o texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeDefined();
  });

  it('Link "Favorite Pokémons" redireciona para a URL "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritePokemons);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('"/pagina-nao-encontrada" redireciona para pagina "Not Found"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-nao-encontrada');
    expect(screen.getByRole('heading', { name: /Not Found/i, level: 2 })).toBeDefined();
  });
});
