import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o conteúdo do componente FavoritePokemons', () => {
  test('Verifica a renderização de uma mensagem caso não haja favoritos', () => {
    render(<FavoritePokemons />);
    const notFoundMessage = screen.getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetailsLink);
    const favoritePokemon = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favoritePokemon);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const pokemonCardName1 = screen.getByText('Pikachu');
    expect(pokemonCardName1).toBeInTheDocument();
  });
});
