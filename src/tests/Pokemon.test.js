import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa Pokemon', () => {
  test('Testa o nome do Pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });

  test('Testa o tipo do pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });

  test('Testa o peso do pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('Testa imagem', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toHaveAttribute('src', URL);
  });
});
