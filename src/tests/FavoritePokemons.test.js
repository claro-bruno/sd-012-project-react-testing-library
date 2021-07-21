import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('Testa o componente Favorite Pokemons', () => {
  it('Testa caso não tenha nenhum pokémon favorito', () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeDefined();
  });

  it('Testa caso tenha pokémon favorito', () => {
    const { history } = renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(button);
    expect(screen.getByText('Charmander')).toBeDefined();

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemons/4');

    const check = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(check.checked).toEqual(false);
    userEvent.click(check);
    expect(check.checked).toEqual(true);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    expect(history.location.pathname).toBe('/favorites');
    expect(screen.getByText('Charmander')).toBeDefined();
    expect(screen.getByRole('link', { name: 'More details' })).toBeDefined();
  });
});
