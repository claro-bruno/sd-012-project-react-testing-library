import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente <App />', () => {
  it(
    'Os três primerios links são "Home", "About" e "Favorite Pokémons"',
    () => {
      renderWithRouter(<App />);
      const navLinks = screen.getAllByRole('link');
      const [homeLink, aboutLink, favoritePokemonLink] = navLinks;

      expect(homeLink).toHaveTextContent('Home');
      expect(aboutLink).toHaveTextContent('About');
      expect(favoritePokemonLink).toHaveTextContent('Favorite Pokémons');
    },
  );

  it(
    'Clicar em "Home" redireciona a aplicação para a URL "/"',
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: 'Home' });

      event.click(homeLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    },
  );

  it(
    'Clicar em "About" redireciona a aplicação para a URL "/about"',
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: 'About' });

      event.click(aboutLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    },
  );

  it(
    'Clicar em "Favorite Pokémons" redireciona a aplicação para a URL "/favorites"',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

      event.click(favoritePokemonLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    },
  );

  it(
    'Entrar em uma URL desconhecida redireciona a aplicação para a página "NotFound"',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/xablau');

      const notFound = screen.getByText(/page requested not found/i);
      expect(notFound).toBeInTheDocument();
    },
  );
});
