import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste o componente App', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });

  test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
    const home = screen.getByText(/home/i);
    expect(home).toBeDefined();
    const about = screen.getByText(/about/i);
    expect(about).toBeDefined();
    const favoritePokemons = screen.getByText(/favorite pokémons/i);
    expect(favoritePokemons).toBeDefined();
  });

  test('O primeiro link deve possuir o texto "Home"', () => {
    const home = screen.getByText(/home/i);
    expect(home).toBeDefined();
  });

  test('O segundo link deve possuir o texto "About"', () => {
    const about = screen.getByText(/about/i);
    expect(about).toBeDefined();
  });

  test('O terceiro link deve possuir o texto "Favorite Pokémons"', () => {
    const favoritePokemons = screen.getByText(/favorite pokémons/i);
    expect(favoritePokemons).toBeDefined();
  });

  test('Testa se a aplicação é redirecionada para a página inicial', () => {
    const homeClick = screen.getByText(/home/i);
    userEvent.click(homeClick);
    expect(homeClick).toBeDefined();
  });

  test('Testa se a aplicação é redirecionada para a página About', () => {
    const aboutClick = screen.getByText(/about/i);
    userEvent.click(aboutClick);
    expect(aboutClick).toBeDefined();
  });

  test('Testa se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
    const favoritePokemonsClick = screen.getByText(/favorite pokémons/i);
    userEvent.click(favoritePokemonsClick);
    expect(favoritePokemonsClick).toBeDefined();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found', () => {
    render(
      <MemoryRouter initialEntries={ ['/poke'] }>
        <App />
      </MemoryRouter>,
    );
    const notFound = screen.getByText(/page requested not found/i);
    expect(notFound).toBeDefined();
  });
});
