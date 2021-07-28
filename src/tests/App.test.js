import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1- Teste App.js', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeDefined();
  });
  test('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeDefined();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favLink).toBeDefined();
  });
  test('Aplicação é redirecionada para a página inicial, ao clicar no link Home',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /Home/i }));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
  test('Aplicação é redirecionada para página de About, ao clicar no link About',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /About/i }));
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });
  test(
    'Aplicação redirecionada p/ página de Pokémons Favoritados,ao clicar link Favorites',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /favorite/i }));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    },
  );
  test('Aplicação redirecionada para página Not Found,ao entrar em uma URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page not found');
      expect(screen.getByText('Page requested not found')).toBeDefined();
    });
});
