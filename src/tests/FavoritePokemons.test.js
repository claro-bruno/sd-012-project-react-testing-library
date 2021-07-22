import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../types/renderWithRouter';
import App from '../App';

describe('Testando o componente FavoritePokemons.js', () => {
  test('Verifica se exibe mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    const title = screen.getByText(/No favorite pokemon found/i);
    expect(title).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se exibe todos os cards dos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const checkboxFavorite = screen.getByRole('checkbox');
    userEvent.click(checkboxFavorite);
    history.push('/pokemons/4');
    userEvent.click(checkboxFavorite);
    history.push('/favorites');
    const pikachu = screen.getByText('Pikachu');
    const charmander = screen.getByText('Charmander');
    expect(pikachu).toBeInTheDocument();
    expect(charmander).toBeInTheDocument();
    const averageWeight = screen.getAllByText(/average weight/i);
    expect(averageWeight.length).toEqual(2);
    const url = history.location.pathname;
    expect(url).toBe('/favorites');
  });
});
