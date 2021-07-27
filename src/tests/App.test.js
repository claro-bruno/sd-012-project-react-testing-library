import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('teste pagina inicial app.js, se há e se redireciona os links', () => {
  test('home', () => {
    // rederizar a page
    const { history } = renderWithRouter(<App />);
    // capturar o elemento
    const linkToHome = screen.getByRole('link', { name: /Home/i });
    // testa click
    userEvent.click(linkToHome);
    expect(history.location.pathname).toBe('/');
  });

  test('About', () => {
    // rederizar a page
    const { history } = renderWithRouter(<App />);
    // capturar o elemento
    const linkToHome = screen.getByRole('link', { name: /About/i });
    // testa click
    userEvent.click(linkToHome);
    expect(history.location.pathname).toBe('/about');
  });

  test('Favorite Pokemons', () => {
    // rederizar a page
    const { history } = renderWithRouter(<App />);
    // capturar o elemento
    const linkToHome = screen.getByRole('link', { name: /Favorite Pokémons/i });
    // testa click
    userEvent.click(linkToHome);
    expect(history.location.pathname).toBe('/favorites');
  });
});
