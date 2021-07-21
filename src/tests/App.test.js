import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe('Se o topo da página contém um conjunto fixo de links de navegação', () => {
  test('Testa se o primeiro link possui o texto Home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();
  });
  test('Testa se o segundo link possui o texto About', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();
  });
  test('Testa se o terceiro link possui o texto Favorite Pokemons', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(linkFavoritePokemons).toBeInTheDocument();
  });
});

describe('Se a app vai p/ pg inicial, na URL / ao clicar no link Home', () => {
  test('Testa se vai para a página inicial ao clicar em Home', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});

describe('Se a app vai p/ About, na URL /about ao clicar no link About', () => {
  test('Testa se vai para a página About ao clicar em About', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
});

describe('Se a app vai p/ Pokemons Favoritados, na URL /favorites', () => {
  test('Testa se vai p/ a pg Pokemons Favoritados ao clicar em Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});

describe('Testa se a app vai p/ a pg Not Found ao entrar em uma URL desconhecida', () => {
  test('Testa se vai para a página Not Found ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/Not Found/i);
    expect(noMatch).toBeInTheDocument();
  });
});
