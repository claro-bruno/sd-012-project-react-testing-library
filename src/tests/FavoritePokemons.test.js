import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons', () => {
  test('Verifica se caso não haja Pokemon favorito, emite uma mensagem', () => {
    renderWithRouter(<FavoritePokemons />);

    const message = 'No favorite pokemon found';

    const isNotFavorite = screen.getByText(message);

    expect(isNotFavorite).toBeInTheDocument();
  });

  test('Verifica se é renderizado os pokemons favoritos', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémon/i }));

    const favorites = screen.getByRole('link', { name: /More details/i });
    expect(favorites).toBeInTheDocument();
  });
});
