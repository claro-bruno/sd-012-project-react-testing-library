import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa FavoritePokemons', () => {
  test('Verifica se não é encontrado nenhum pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons />);

    const TEXT = /No favorite pokemon found/i;

    expect(screen.getByText(TEXT)).toBeDefined();
  });

  test('Testa os pokémons favoritos', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));

    expect(screen.getByText('Summary')).toBeDefined();

    userEvent.click(screen.getByRole('checkbox'));
    const ICON = 'favorite-icon';
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('class', ICON);

    const pokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokemons);
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('class', ICON);
  });
});
