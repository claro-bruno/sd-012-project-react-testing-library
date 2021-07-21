import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente FavoritePokemons', () => {
  test('Verifica se a msg "No favorite pokemon found", se não tiver favoritos', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const noFavoriteMSG = screen.getByText('No favorite pokemon found');
    expect(noFavoriteMSG).toBeInTheDocument();
  });

  test('Verifica se aparece pokémons favoritados', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);

    const favoriteBox = screen.getByRole('checkbox');
    userEvent.click(favoriteBox);

    userEvent.click(favoriteLink);
    const pokemon = screen.getByText('Pikachu');

    expect(pokemon).toBeInTheDocument();
  });
});
