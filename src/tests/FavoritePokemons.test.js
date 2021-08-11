import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Favorites Pokémons page test', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('If theres not any favorite pokémon: '
  + 'render the message "No favorite pokemon found"', () => {
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeDefined();
  });

  it('Checks if the favorite pokemons are rendered', () => {
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    const input = screen.getByRole('checkbox');
    userEvent.click(input);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const title = screen.getByText('Favorite pokémons');
    expect(title).toBeDefined();
  });
});
