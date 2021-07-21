import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa componente App', () => {
  it(`Verifica se existem links com os textos: "Home", "About" e
  "Favorite Pokémons"`, () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavorite).toBeInTheDocument();
  });

  it('Verifica se os links são clicáveis e levam para as rotas corretas', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    const linkAbout = screen.getByRole('link', { name: /About/i });
    const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });

    userEvent.click(linkAbout);
    const { pathname: about } = history.location;
    expect(about).toBe('/about');

    userEvent.click(linkFavorites);
    const { pathname: favorites } = history.location;
    expect(favorites).toBe('/favorites');

    userEvent.click(linkHome);
    const { pathname: home } = history.location;
    expect(home).toBe('/');
  });

  it(`Verifica se a aplicação é redirecionada para a página Not Found ao entrar
  em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/url-qualquer');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});
