import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const getHome = screen.getByRole('link', { name: 'Home' });
    expect(getHome).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto About.', () => {
    renderWithRouter(<App />);
    const getAbout = screen.getByRole('link', { name: 'About' });
    expect(getAbout).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const getFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(getFav).toBeInTheDocument();
  });
});

describe('Testando se a aplicação redireciona:', () => {
  test('Para Home /', () => {
    const { history } = renderWithRouter(<App />);
    const getHome = screen.getByRole('link', { name: 'Home' });
    expect(getHome).toBeInTheDocument();

    userEvent.click(getHome);
    const url = history.location.pathname;
    expect(url).toBe('/');
  });

  test('Para About /about', () => {
    const { history } = renderWithRouter(<App />);
    const getHome = screen.getByRole('link', { name: 'About' });
    expect(getHome).toBeInTheDocument();

    userEvent.click(getHome);
    const url = history.location.pathname;
    expect(url).toBe('/about');
  });

  test('Para a Pokémons Favoritados /favorites', () => {
    const { history } = renderWithRouter(<App />);
    const getHome = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(getHome).toBeInTheDocument();

    userEvent.click(getHome);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });

  test('Para a Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pagin-nao-existe');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});
