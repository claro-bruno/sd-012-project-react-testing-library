import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa FavoritePokemons', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Existe mensagem "No favorite pokemon found", em caso de não favoritados',
    () => {
      const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(favoritePokemons);
      const paragraphOne = 'No favorite pokemon found';
      const paragraphOneTest = screen.getByText(paragraphOne);
      expect(paragraphOneTest).toBeDefined();
    });
});
