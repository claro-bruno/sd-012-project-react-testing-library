import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa FavoritePokemons', () => {
  it('Testa se aparece "No favorite pokemon found" se não tiver favoritos', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Testa se aparece todos os cards de pokémons favoritos', () => {
    renderWithRouter(
      <App />,
    );
    const favPage = screen.getByText('Favorite Pokémons');

    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByText('Pokémon favoritado?'));
    userEvent.click(favPage);

    const pokeNameId = screen.getByTestId('pokemon-name');

    expect(pokeNameId).toBeInTheDocument();

    userEvent.click(screen.getByText('Home'));
    userEvent.click(screen.getByText('Bug'));

    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByText('Pokémon favoritado?'));
    userEvent.click(favPage);

    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(2);
  });
});
