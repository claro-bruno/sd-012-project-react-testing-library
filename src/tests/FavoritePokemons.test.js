import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  it('Verifica se a mensagem No favorite pokemon found renderiza na tela', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const messageElement = screen.getByText('No favorite pokemon found');
    expect(messageElement).toBeInTheDocument();
  });
  it('Verifica se o pokémon favoritado renderiza nos favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText('More details');
    userEvent.click(moreDetailsLink);
    const addToFavoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(addToFavoriteCheck);
    history.push('/favorites');
    expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/Electric/i)).toBeInTheDocument();
    expect(screen.getByText(/Average weight: 6.0 kg/i)).toBeInTheDocument();
  });
});
