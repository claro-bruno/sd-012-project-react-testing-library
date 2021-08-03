import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';

import App from '../App';

describe('Teste do componente App', () => {
  test('Verifica se o componente possúi três links de navegação', () => {
    renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    const linkToAbout = screen.getByRole('link', { name: /About/i });
    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorite).toBeInTheDocument();
  });

  test('Verifica o redirecionamento para a página Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkToHome);

    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  test('Verifica o redirecionamento para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkToAbout);

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
  });

  test('Verifica o redirecionamento para a página Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkToFavorite);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('Verifica o redirecionamento para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const notFoundPage = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });

    expect(notFoundPage).toBeInTheDocument();
  });
});
