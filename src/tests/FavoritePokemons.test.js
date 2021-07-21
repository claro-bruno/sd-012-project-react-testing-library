import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa componente <FavoritePokemons />', () => {
  it('testa mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('testa se os pokemon favoritos aparecem', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(detailsLink);
    expect(screen.getByText('Summary')).toBeInTheDocument();
    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);
    userEvent.click(favoriteLink);
    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites.length).toBe(1);
  });
});
