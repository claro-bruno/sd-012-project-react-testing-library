import React from 'react';
import App from '../App';
import userEvent from "@testing-library/user-event";
import renderWithRouter from '../types/renderWithRouter';

describe('Testando o componente App.js',  () => {
  test('Verifica se renderiza o texto Home', () => {
    const { getByText } = renderWithRouter(<App />);
    const home = getByText(/Home/i)
    expect(home).toBeInTheDocument();
  });
  test('Verifica se renderiza o texto About', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i)
    expect(about).toBeInTheDocument();
  });
  test('Verifica se renderiza o texto Favorite Pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i)
    expect(favoritePokemons).toBeInTheDocument();
  });
  test('Verifica URL /', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('about');
    const home = getByText(/Home/i);
    userEvent.click(home);
    const title = getByText(/Encountered pokémons/i)
    expect(title).toBeInTheDocument();
  });
  test('Verifica URL /about', () => {
    const { getByText } = renderWithRouter(<App />);
    const about = getByText(/About/i);
    userEvent.click(about);
    const title = getByText(/About pokédex/i)
    expect(title).toBeInTheDocument();
  });
  test('Verifica URL /favorites sem adicionar favorito(s)', () => {
    const { getByText } = renderWithRouter(<App />);
    const favoritePokemons = getByText(/Favorite Pokémons/i);
    userEvent.click(favoritePokemons);
    const title = getByText(/No favorite pokemon found/i)
    expect(title).toBeInTheDocument();
  });
  test('Verifica se renderiza URL not found', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('wrongURL');
    const error = getByText(/Page requested not found/);
    expect(error).toBeInTheDocument();
  });
})
 