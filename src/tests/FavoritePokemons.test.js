import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Teste o componente FavoritePokemons', () => {
  it(`Teste se é exibido na tela a mensagem No favorite
  pokemon found, se a pessoa não tiver pokémons favoritos.`, () => {
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    const noFavoriteMessage = screen.getByText('No favorite pokemon found');
    expect(noFavoriteMessage).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const homeMessage = screen.getByRole('heading', { level: 2 });
    expect(homeMessage).toHaveTextContent(/encountered pokémons/i);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const favoriteQuestion = screen.getByText(/pokémon favoritado?/i);
    expect(favoriteQuestion).toBeInTheDocument();
    userEvent.click(favoriteQuestion);
    const favoriteCheck = screen.getByRole('checkbox', { checked: true });
    expect(favoriteCheck).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);
    const favoritePokemon = screen.getByText(/pikachu/i);
    expect(favoritePokemon).toBeInTheDocument();
  });
});
