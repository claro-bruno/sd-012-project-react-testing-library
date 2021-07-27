import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Test favorite Pokemons', () => {
  it('Test without pokemon', () => {
    // render the page
    renderWithRouter(<FavoritePokemons />);
    // get element
    const text = screen.getByText('No favorite pokemon found');
    // test
    expect(text).toBeDefined();
  });

  it('Testa caso tenha pokémon favorito', () => {
    // render the page
    renderWithRouter(<App />);
    // get element
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const check = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(check);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    // test
    expect(screen.getByText('Pikachu')).toBeDefined();
    expect(screen.getByText('Electric')).toBeDefined();
    expect(screen.getByText('Average weight: 6.0 kg'))
      .toBeDefined();
  });
});
