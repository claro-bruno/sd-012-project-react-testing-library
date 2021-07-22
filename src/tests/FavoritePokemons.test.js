import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica FavoritePokemons', () => {
  it('Testa se exibe a mensagem "No favorite pokemon found" ', () => {
    renderWithRouter(<FavoritePokemons />);

    const NotFavorite = /No favorite pokemon found/i;

    expect(screen.getByText(NotFavorite)).toBeDefined();
  });

  it('Testa se exibe os pokemons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(screen.getByText('Summary')).toBeDefined();

    const FAVORITE_ICON = 'favorite-icon';
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('class', FAVORITE_ICON);

    const favoritePokemons = screen.getByRole('link', { name: /Favorite pokémons/i });
    userEvent.click(favoritePokemons);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('class', FAVORITE_ICON);
  });
});
