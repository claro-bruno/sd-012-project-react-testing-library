import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica Pokedex.test.js', () => {
  test('Verifica se a links na pagina Inicial', () => {
    renderWithRouter(<App />);

    const textPoke = screen.getByText(/Encountered pokémons/i);
    expect(textPoke).toBeDefined();
    const bttn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(bttn).toBeDefined();

    userEvent.click(bttn);
    const imgPok = screen.getByRole('img');
    expect(imgPok.src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });
});
