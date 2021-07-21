import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa se o app.js', () => {
  it('tem os links Home, About e Favorite Pokemons', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /Home/i });
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByRole('link', { name: /About/i });
    expect(linkAbout).toBeInTheDocument();

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  it('ao clicar no home é redirecionado a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('ao clicar no about é redirecionado a pagina About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('se ao clicar no Favorite Pokemons é redirecionado a pagina de Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('se entrar uma URL desconhecida é redirecionado ao Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/naoEncontrado');
    const noMatch = screen.getByRole('heading', { name: /page requested not found/i });
    expect(noMatch).toBeInTheDocument();
  });
});

/* levei 30 minutos pra perceber que o {`Page requested ` + `not found`} do componente
not found era a mesma coisa que page requested not found */
