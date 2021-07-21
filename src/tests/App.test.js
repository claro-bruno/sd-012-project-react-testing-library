import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    it('O primeiro link deve possuir o texto Home', () => {
      const { history } = renderWithRouter(<App />);
      const linkHome = screen.getByRole('link', { name: /Home/i });
      expect(linkHome).toBeInTheDocument();
      // Teste se a aplicação é redirecionada para a página inicial [...] Home
      userEvent.click(linkHome);
      const { pathname } = history.location;
      // verificar se a url é "/"
      expect(pathname).toBe('/');
      expect(linkHome).toBeInTheDocument();
    });
    it('O segundo link deve possuir o texto About', () => {
      const { history } = renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /About/i });
      expect(linkAbout).toBeInTheDocument();
      // Teste se a aplicação é redirecionada para a página de About
      userEvent.click(linkAbout);
      const { pathname } = history.location;
      // verificar se a url é "/about"
      expect(pathname).toBe('/about');
      expect(linkAbout).toBeInTheDocument();
    });
    it('O terceiro link deve possuir o texto Favorite Pokémons.', () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorites = screen.getByRole('link', { name: /Favorite/i });
      expect(linkFavorites).toBeInTheDocument();
      // Teste se a aplicação é redirecionada para a página de Pokémons Favoritados
      userEvent.click(linkFavorites);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
      expect(linkFavorites).toBeInTheDocument();
    });
    it('Teste se a aplicação é redirecionada para a página Not Found [...]', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pagina-que-nao-existe');
      expect(screen.getByText('Page requested not found')).toBeDefined();
    });
  });
