import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente FavoritePokemons', () => {
  it('Testa se aparece na tela uma mensagem, caso não haja pokémons', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNoPokemons = screen.getByText(/No favorite pokemon found/i);
    expect(textNoPokemons).toBeInTheDocument();
  });

  it('Testa se, ao favoritar um Pokémon, ele aparece na lista', () => {
    renderWithRouter(<App />);
    renderWithRouter(<FavoritePokemons />);
    const homeButton = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeButton);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favoriteCheckbox = screen.getByRole('checkbox', { checked: false });
    userEvent.click(favoriteCheckbox);
    const favoriteButton = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteButton);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
