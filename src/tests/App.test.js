import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

// https://stackoverflow.com/questions/61482418/react-testing-library-screen-vs-render-queries //

describe('Teste de componente <App.js />', () => {
  it('Se o topo do ao contém um conjunto fixo de links de navegação', () => {
    render(<App />);
    expect(screen.getByRole('Home')).toBeInTheDocument();
    expect(screen.getByRole('About')).toBeInTheDocument();
    expect(screen.getByRole('Favorite Pokémons')).toBeInTheDocument();
  });

  describe('Verifica os links presentes na aplicação', () => {
    test(`Testa se a aplicação contêm o link "Home"
       e se este redireciona para a página ao ser clicado`,
    () => {
      const { history } = renderWithRouter(<App />);
      const homeLink = screen.getByRole('link', { name: /Home/i });
      expect(homeLink).toBeInTheDocument();

      userEvent.click(homeLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    test(`Testa se a aplicação contêm o link "About"
       e se este redireciona para a página ao ser clicado`,
    () => {
      const { history } = renderWithRouter(<App />);
      const aboutLink = screen.getByRole('link', { name: /About/i });
      expect(aboutLink).toBeInTheDocument();

      userEvent.click(aboutLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    test(`Testa se a aplicação contêm o link "Favorite"
       e se este redireciona para a página ao ser clicado`,
    () => {
      const { history } = renderWithRouter(<App />);
      const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(favoriteLink).toBeInTheDocument();
      userEvent.click(favoriteLink);
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  });
});
