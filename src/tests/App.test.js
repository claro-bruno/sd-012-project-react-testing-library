import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

const { render, screen } = require('@testing-library/react');

describe('Testa o componente App', () => {
  describe('Testa se a aplicação contém conjunto fixo de', () => {
    it('Testa se o primeiro link possui o texto "Home"', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeInTheDocument();
    });

    it('Testa se o primeiro link possui o texto "About"', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeInTheDocument();
    });
    it('Testa se o primeiro link possui o texto "Favorite Pokémons"', () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );

      const favoritePokemonsLink = screen
        .getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoritePokemonsLink).toBeInTheDocument();
    });
  });

  describe('Testa as Rotas da Aplicação', () => {
    it('Testa se ao clicar no link "Home", realmente ocorre o redirecionamento', () => {
      renderWithRouter(<App />);

      const homeLink = screen.getByRole('link', { name: /Home/i });
      userEvent.click(homeLink);
    });

    it('Testa se ao clicar no link "About", vai para a página "/about"', () => {
      renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', { name: /About/i });
      userEvent.click(aboutLink);
    });

    it('Testa se ao clicar em "Favorite Pokémons", vai para "/favorites"', () => {
      renderWithRouter(<App />);

      const favoritePokemonsLink = screen
        .getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favoritePokemonsLink);
    });
  });
});
