import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o Topo da Aplicação', () => {
  let history = {};

  beforeEach(() => {
    history = renderWithRouter(<App />).history;
  });

  it(('Testando se o topo da aplicação contém barra de navegação'), () => {
    const navBar = screen.getByRole('navigation');
    expect(navBar).toBeInTheDocument();
  });

  it(('Testando se o topo da aplicação contém links de navegação'), () => {
    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');
    const favoriteLink = screen.getByText('Favorite Pokémons');
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it(('Testando funcionalidade do botão Home'), () => {
    const homeLink = screen.getByText('Home');
    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it(('Testando funcionalidade do botão About'), () => {
    const aboutLink = screen.getByText('About');
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it(('Testando funcionalidade do botão Favorite Pokémons'), () => {
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it(('Testando se a página Not Found renderiza corretamente'), () => {
    history.push('/patamon');
    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
  });
});
