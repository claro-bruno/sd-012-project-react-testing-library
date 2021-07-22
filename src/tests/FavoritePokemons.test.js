import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Teste na pagina de pokemons favoritos', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('Caso nao haja pokemon favorito renderiza a msg No favorite pokemon found', () => {
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(link);
    const msg = screen.getByText('No favorite pokemon found');
    expect(msg).toBeDefined();
  });
  test('Verifica se os pokemons favoritos sao renderizados', () => {
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    const input = screen.getByRole('checkbox');
    userEvent.click(input);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);
    const title = screen.getByText('Favorite pokémons');
    expect(title).toBeDefined();
  });
});
