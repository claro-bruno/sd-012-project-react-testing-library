import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica App.js', () => {
  it('Verifica se o primeiro link possui o texto Home', () => {
    const { history } = renderWithRouter(<App />);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    expect(linkToHome).toBeInTheDocument();
    userEvent.click(linkToHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o segundo link possui o texto About', () => {
    const { history } = renderWithRouter(<App />);

    const linkToAbout = screen.getByRole('link', { name: /About/i });
    expect(linkToAbout).toBeInTheDocument();
    userEvent.click(linkToAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se o terceiro link possui o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const linkToFavoritePokémons = screen.getByRole('link',
      { name: /favorite Pokémons/i });
    expect(linkToFavoritePokémons).toBeInTheDocument();
    userEvent.click(linkToFavoritePokémons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se renderiza Rota nao encontrada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('NotFound');
    const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
