import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa FavoritePokemons', () => {
  const { getByRole, getByText, getAllByRole } = screen;
  test('Verifica se não é encontrado nenhum pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons />);

    const TEXT = /No favorite pokemon found/i;

    expect(getByText(TEXT)).toBeDefined();
  });

  test('Testa os pokémons favoritos', () => {
    renderWithRouter(<App />);

    userEvent.click(getByRole('link', { name: /more details/i }));

    expect(getByText('Summary')).toBeDefined();

    userEvent.click(getByRole('checkbox'));
    const ICON = 'favorite-icon';
    expect(getAllByRole('img')[1]).toHaveAttribute('class', ICON);

    const pokemons = getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(pokemons);
    expect(getAllByRole('img')[1]).toHaveAttribute('class', ICON);
  });
});
