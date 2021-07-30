import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Verificando todo o meu component APP', () => {
  it('Se ao clicar no botao home redireciona pra raiz da minha aplicacao', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/home/i);
    expect(homeLink).toHaveTextContent('Home');
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Se ao clicar no botao About redireciona pra `/about`', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/about/i);
    expect(aboutLink).toHaveTextContent('About');
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Se ao clicar no botao Favorite redireciona pra `/favorites`', () => {
    const { history } = renderWithRouter(<App />);

    const favoritesLink = screen.getByText(/favorite pokémons/i);
    expect(favoritesLink).toHaveTextContent('Favorite Pokémons');
    userEvent.click(favoritesLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Se app é redirecionado para a página NotFound ao entrar em uma unknown URL', () => {
    const { history } = renderWithRouter(<App />);

    let notFound = screen.queryByText(/not found/i);
    expect(notFound).toBeNull();
    history.push('/hdiahuaihsdui');
    notFound = screen.queryByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
