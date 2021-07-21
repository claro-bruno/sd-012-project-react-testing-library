import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica App.js', () => {
  test('Verifica se o link home vai para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkToHome = screen.getByText(/home/i);
    // const linkToHome = screen.getByRole('link', { name:/home/i }); outra forma de fazer utilizando o ByRole.
    expect(linkToHome).toBeInTheDocument();

    userEvent.click(linkToHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Verifica se o link about vai para a página about', () => {
    const { history } = renderWithRouter(<App />);
    const linkToAbout = screen.getByText(/about/i);

    expect(linkToAbout).toBeInTheDocument();

    userEvent.click(linkToAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Verifica se o link favorite vai para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const linkToFavorites = screen.getByText(/favorite/i);

    expect(linkToFavorites).toBeInTheDocument();

    userEvent.click(linkToFavorites);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Verifica se a aplicação é redirecionada para a página Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/erro');
    const notFoundPage = screen.getByRole('heading',
      { name: /Page requested not found/i });
      // Feito de forma diferente usando o getByRole.

    expect(notFoundPage).toBeInTheDocument();
  });
});
