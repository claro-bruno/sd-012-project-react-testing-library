import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente FavoritePokemons', () => {
  it(`Teste se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(screen.getByText(/No favorite pokemon found/i));
  });

  it(`Teste se é exibido todos os 
  cards de pokémons favoritados`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    userEvent.click(screen.getByLabelText(/Pokémon favoritado/i));
    history.push('/favorites');
    expect(screen.getByText(/pikachu/i));
  });
});
