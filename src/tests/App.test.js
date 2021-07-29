import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

describe('Verifica roteamentos da aplicação', () => {
  it('Quando clicamos no link "Home" a URL se torna "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(homeLink);
    const headingTitle = screen.getByRole('heading', { level: 2 });
    const { pathname } = history.location;

    expect(pathname).toBe('/');
    expect(headingTitle.innerHTML).toBe('Encountered pokémons');
  });
  it('Quando clicamos no link "Favorite Pokémons" a URL se torna "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favoritesLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritesLink);
    const headingTitle = screen.getByRole('heading', { level: 2 });
    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
    expect(headingTitle).toHaveTextContent('Favorite pokémons');
  });
});

describe('Verifica se o topo da aplicação contém um conjunto fixo de links', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('O primeiro Link deve possuir o texto "Home"', () => {
    const firstLink = screen.getAllByRole('link');
    expect(firstLink[0].innerHTML).toBe('Home');
  });

  it('O segundo Link deve possuir o texto "Favorite Pokémons"', () => {
    const thirdLink = screen.getAllByRole('link');
    expect(thirdLink[1].innerHTML).toBe('About');
  });

  it('O terceiro Link deve possuir o texto "Favorite Pokémons"', () => {
    const thirdLink = screen.getAllByRole('link');
    expect(thirdLink[2].innerHTML).toBe('Favorite Pokémons');
  });
});
