import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do componente <FavoritePokemons.js />', () => {
  test(' Teste se "No favorite pokemon found" é encontrad se não há favorito', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se são exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    const textFavorite = screen.getByText('Favorite pokémons');
    expect(textFavorite).toBeInTheDocument();
  });
});
