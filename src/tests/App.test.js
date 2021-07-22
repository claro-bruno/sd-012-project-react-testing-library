import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

describe(
  'Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    beforeEach(() => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>,
      );
    });

    test('Testa a presença e funcionamento do link para Home', () => {
      const homeLink = screen.getByRole('link', { name: /Home/i });
      userEvent.click(homeLink);
      const homeTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
      expect(homeTitle).toBeInTheDocument();
    });

    test('Testa a presença e funcionamento do link para About', () => {
      const aboutLink = screen.getByRole('link', { name: /About/i });
      userEvent.click(aboutLink);
      const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i });
      expect(aboutTitle).toBeInTheDocument();
    });

    test('Testa a presença e funcionamento do link para Favorite pokémons', () => {
      const favoritesLink = screen.getByRole('link', { name: /Favorite pokémons/i });
      userEvent.click(favoritesLink);
      const favoritesTitle = screen.getByRole('heading', { name: /Favorite pokémons/i });
      expect(favoritesTitle).toBeInTheDocument();
    });
  },
);
