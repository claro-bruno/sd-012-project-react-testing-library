import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('testa se o favorite pokemons', () => {
  it('exibe msg especifica se não houver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const especifMsg = screen.getByText('No favorite pokemon found');
    expect(especifMsg).toBeInTheDocument();
  });
  it('testa se exibe pokémons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(/Favorite Pokémons/));
    userEvent.click(screen.getByText(/Home/));
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    userEvent.click(screen.getByText(/More details/));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByText(/Favorite Pokémons/));
    expect(screen.getByAltText(/Pikachu sprite/)).toBeInTheDocument();
    expect(screen.getByAltText(/Charmander sprite/)).toBeInTheDocument();
    expect(screen.queryByAltText(/Caterpie sprite/)).toBeNull();
  });
});
