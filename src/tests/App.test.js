import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente App.js', () => {
  test('Testa o texto contido no conjunto de links no topo da página', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémon');
  });

  test('Testa se ao clickar no link "Home" aplicação vai para página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const homeNav = screen.getByRole('link', { name: 'Home' });

    userEvent.click(homeNav);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se ao clickar no link "About" aplicação vai para página de About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutNav = screen.getByRole('link', { name: 'About' });

    userEvent.click(aboutNav);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se ao clickar no link "Favorite Pokémons"'
    + 'vai para a página de pokémons favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokeNav = screen.getByRole('link', { name: 'Favorite Pokémons' });

    userEvent.click(favoritePokeNav);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
