import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente App.js', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
  test('Os links devem possuir as palavras: Home, About, Favorite Pokémons', () => {
    const homeText = screen.getByText(/home/i);
    expect(homeText).toBeInTheDocument();
    const aboutText = screen.getByText(/about/i);
    expect(aboutText).toBeInTheDocument();
    const favoritePokemonsText = screen.getByText(/favorite pokémons/i);
    expect(favoritePokemonsText).toBeInTheDocument();
  });
  test('Testa o click do link Home', () => {
    const linkToHome = screen.getByText(/home/i);
    userEvent.click(linkToHome);
    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });
  test('Testa o click do link About', () => {
    const linkToAbout = screen.getByText(/about/i);
    userEvent.click(linkToAbout);
    expect(screen.getByText(/About pokédex/i)).toBeInTheDocument();
  });
  test('Testa o click do link Favorite Pokémons', () => {
    const linkToFavoritePokemons = screen.getByText(/favorite pokémons/i);
    userEvent.click(linkToFavoritePokemons);
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });
  test('Testa link para a pagina Not Found ao entrar em URL desconhecida', () => {
    render(
      <MemoryRouter initialEntries={ ['/poke'] }>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText(/page requested not found/i)).toBeInTheDocument();
  });
});
