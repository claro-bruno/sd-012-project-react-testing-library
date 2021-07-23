import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente <App/js>', () => {
  describe(`Teste se o topo da aplicação
  contém um conjunto fixo de links de navegação.`, () => {
    beforeEach(() => {
      renderWithRouter(<App />);
    });

    it('O primeiro link deve possuir o texto "Home"', () => {
      const home = screen.getAllByRole('link');

      expect(home[0].innerHTML).toBe('Home');
    });

    it('O segundo link deve possuir o texto "About"', () => {
      const about = screen.getAllByRole('link');

      expect(about[1].innerHTML).toBe('About');
    });

    it('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
      const favorite = screen.getAllByRole('link');

      expect(favorite[2].innerHTML).toBe('Favorite Pokémons');
    });
  });

  describe('Verifica as Rotas do componente', () => {
    it(`Teste se a aplicação é redirecionada para a página inicial,
    na URL / ao clicar no link Home da barra de navegação.`, () => {
      const { history } = renderWithRouter(<App />);
      const routeHome = screen.getByRole('link', { name: 'Home' });
      fireEvent.click(routeHome);
      const { pathname } = history.location;

      expect(pathname).toBe('/');
    });

    it(`Teste se a aplicação é redirecionada para a página de About,
    na URL /about, ao clicar no link About da barra de navegação.`, () => {
      const { history } = renderWithRouter(<App />);
      const routeAbout = screen.getByRole('link', { name: 'About' });
      fireEvent.click(routeAbout);
      const { pathname } = history.location;

      expect(pathname).toBe('/about');
    });

    it(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,
    na URL /favorites, ao clicar no link Favorite Pokémons
    da barra de navegação.`, () => {
      const { history } = renderWithRouter(<App />);
      const routeFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      fireEvent.click(routeFavorite);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });

    // it(`Teste se a aplicação é redirecionada para a página
    // Not Found ao entrar em uma URL desconhecida.`, () => {
    //   const { history } = renderWithRouter(<App />);
    //   const routeUndefined = screen.getByRole('link', { name: '' });
    //   fireEvent.click(routeUndefined);
    //   const { pathname } = history.location;

    //   expect(pathname).toBe('/ ');
    // });
  });
});
