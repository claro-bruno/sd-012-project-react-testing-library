import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibido: No favorite pokemon found, quando não há favoritos.', () => {
    renderWithRouter(<App />);
    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(linkToFavorite);
    const noFav = screen.getByText('No favorite pokemon found');
    expect(noFav).toBeInTheDocument();
  });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Electric/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    fireEvent.click(screen.getByRole('button', { name: /Fire/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    fireEvent.click(screen.getByRole('button', { name: /Bug/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    fireEvent.click(screen.getByRole('button', { name: /Poison/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    fireEvent.click(screen.getByRole('button', { name: /Psychic/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    fireEvent.click(screen.getByRole('button', { name: /Normal/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    fireEvent.click(screen.getByRole('button', { name: /Dragon/i }));
    fireEvent.click(screen.getByRole('link', { name: /More Details/i }));
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));

    const linkToFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    fireEvent.click(linkToFavorite);
    const testedQuantity = 7;
    const favorites = screen.getAllByTestId('pokemon-name');
    expect(favorites.length).toBe(testedQuantity);
  });
});
