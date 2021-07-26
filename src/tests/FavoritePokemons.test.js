import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  test('Verifica se mensagem "not found" aparece quando não há favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Verifica se os pokemons favoritados aparecem na página de favoritos', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/Fire/i));
    fireEvent.click(screen.getByText(/more details/i));
    const faveCheckbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(faveCheckbox);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoriteLink);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
