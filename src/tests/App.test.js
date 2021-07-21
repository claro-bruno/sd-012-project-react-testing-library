import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testes realizados no App', () => {
  it('Verifica se App possui conjunto fixo de links de nav', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorites).toBeInTheDocument();
  });

  it('Verifica se aplicacao e redirecionada para pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });

    userEvent.click(linkHome);

    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se aplicacao e redirecionada para pagina About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });

    userEvent.click(linkAbout);

    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se aplicacao e redirecionada para pagina Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(linkFavorites);

    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se aplicacao e redirecionada para pagina nao encontrada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');

    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(notFound).toBeInTheDocument();
  });
});
