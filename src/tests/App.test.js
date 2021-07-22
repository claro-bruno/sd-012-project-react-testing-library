import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Componente App.js', () => {
  test('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoriteLink = screen.getByText('Favorite Pokémons');

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  test(
    'Aplicação é redirecionada para a Home ao clicar no link Home da barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);

      const homeNav = screen.getByRole('navigation', {
        Name: 'Home',
      });

      userEvent.click(homeNav);

      const path = history.location.pathname;

      expect(path).toBe('/');
    },
  );

  test('Teste se a aplicação redireciona para a página de About ao clicar no link About.',
    () => {
      const { history } = renderWithRouter(<App />);

      const aboutLink = screen.getByRole('link', {
        name: 'About',
      });

      fireEvent.click(aboutLink);

      const { pathname } = history.location;

      expect(pathname).toBe('/about');
    });

  test(
    'Aplicação redireciona para a URL /favorites ao clicar no link Favorite Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);

      const favoritesLink = screen.getByRole('link', {
        name: 'Favorite Pokémons',
      });

      fireEvent.click(favoritesLink);

      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    },
  );

  test(
    'Aplicação redireciona para a página Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/página-inventada');
      const notFoundText = screen.getByText('Page requested not found');

      expect(notFoundText).toBeInTheDocument();
    },
  );
});
