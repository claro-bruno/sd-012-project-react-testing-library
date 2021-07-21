import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWhitRouter from './renderWhithRouter';
import App from '../App';

describe('Testa o componente Favorite Pokemons', () => {
  test('Testa se uma mensagem aparece quando não há Pokémons favoritos', () => {
    renderWhitRouter(<App />);
    const clickAtFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(clickAtFavorite);

    const NotFound = /No favorite pokemon found/i;
    const checkNotFavorite = screen.getByText(NotFound);
    expect(checkNotFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWhitRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const clickFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(clickFavorite);

    const clickAtFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(clickAtFavorite);

    const checkFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(checkFavorite).toBeInTheDocument();
  });
});
