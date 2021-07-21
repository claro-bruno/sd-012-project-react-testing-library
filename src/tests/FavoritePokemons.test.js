import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('requisito 3- testa componente FavoritePokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('aparece No favorite pokemon found na pagina /favorites', () => {
    userEvent.click(screen.getByText('Favorite Pokémons'));

    const noFavMsg = screen.getByText('No favorite pokemon found');
    expect(noFavMsg).toBeInTheDocument();
  });

  it('aparece pokemons favoritos na pagina /favorites', () => {
    userEvent.click(screen.getByRole('button', { name: 'Electric' }));
    userEvent.click(screen.getByRole('link', { name: 'More details' }));

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Home' }));

    userEvent.click(screen.getByRole('button', { name: 'Bug' }));
    userEvent.click(screen.getByRole('link', { name: 'More details' }));

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    const pokeList = screen.getAllByTestId('pokemon-name');
    expect(pokeList.length).toBe(2);
  });
});
