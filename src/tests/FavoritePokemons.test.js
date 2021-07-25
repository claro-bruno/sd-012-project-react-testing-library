import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa componente Favorite Pokémons', () => {
  test('Teste página vazia', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFound = screen.getByText(/No favorite pokemon found/i);
    expect(noFound).toBeDefined();
  });

  test('Testa cards favoritados', () => {
    renderWithRouter(<App />);
    const card = screen.getByText(/more details/i);
    userEvent.click(card);
    const favoriteCard = screen.getByRole('checkbox');
    userEvent.click(favoriteCard);

    renderWithRouter(<FavoritePokemons />);
    const cards = screen.getByText(/details/i);
    expect(cards).toBeDefined();
  });
});
