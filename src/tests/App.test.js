import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Requisito 1', () => {
  it('testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const expectedLinksAtNav = 3;
    expect(nav.childElementCount).toBe(expectedLinksAtNav);
  });

  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks = nav.childNodes;
    expect(navLinks[0].textContent).toBe('Home');
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks = nav.childNodes;
    expect(navLinks[1].textContent).toBe('About');
  });

  it('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const navLinks = nav.childNodes;
    expect(navLinks[2].textContent).toBe('Favorite Pokémons');
  });

  it('testa se a página inicial é renderizada ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const homeLink = nav.childNodes[0];
    fireEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('testa se a página sobre é renderizada ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);
    const nav = screen.getByRole('navigation');
    const aboutLink = nav.childNodes[1];
    fireEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('testa se a página de pokemons é renderizada ao clicar no link Favorite Pokémons',
    () => {
      const { history } = renderWithRouter(<App />);
      const nav = screen.getByRole('navigation');
      const favoritePokemonsLink = nav.childNodes[2];
      fireEvent.click(favoritePokemonsLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
});