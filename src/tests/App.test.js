import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componente App.js', () => {
  it('testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const expectedLinksAtNav = 3;
    expect(nav.childElementCount).toBe(expectedLinksAtNav);
  });

  it('testa se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks = nav.childNodes;
    expect(navLinks[0].textContent).toBe('Home');
  });

  it('testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks = nav.childNodes;
    expect(navLinks[1].textContent).toBe('About');
  });

  it('testa se o terceiro link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks = nav.childNodes;
    expect(navLinks[2].textContent).toBe('Favorite Pokémons');
  });

  it('testa se, ao clicar no link Home, é renderizada a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const homeLink = nav.childNodes[0];
    fireEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('testa se, ao clicar no link About, é renderizada a página sobre', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const aboutLink = nav.childNodes[1];
    fireEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('testa se, ao clicar no link Favorite Pokémons, é renderizada a página de pokemons',
    () => {
      const { history } = renderWithRouter(<App />);
      const nav = screen.getByRole('navigation');
      const favoritePokemonsLink = nav.childNodes[2];
      fireEvent.click(favoritePokemonsLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
});
