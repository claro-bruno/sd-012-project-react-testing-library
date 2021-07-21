import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa links do App', () => {
  it('Verifica se o link "Home" é o primeiro e redireciona para "/"', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getAllByRole('link')[0];
    expect(linkHome).toHaveTextContent('Home');
    userEvent.click(linkHome);
    const { pathname } = history.location;
    // desconstrução do pathname adicionada a partir da dica da colega Adriana Biberg
    expect(pathname).toBe('/');
  });

  it('Verifica se o link "About" é o segundo e redireciona para "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getAllByRole('link')[1];
    expect(linkAbout).toHaveTextContent('About');
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se "Favorite Pokémons" é o segundo link redireciona a "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getAllByRole('link')[2];
    expect(linkFavorite).toHaveTextContent('Favorite Pokémons');
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

describe('Testa page not found', () => {
  it('Testa se é renderizada a página Not Found, ao digitar uma url inválida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-invalida');
    const pageNotFoundImg = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pageNotFoundImg).toBeDefined();
  });
});
