import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithrouter';

describe('Verifica App.js', () => {
  it('Testa se é exibido na tela a mensagem "No favorite pokemon found". ', () => {
    renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(linkFavoritePokemon);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Test se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));

    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });
});
