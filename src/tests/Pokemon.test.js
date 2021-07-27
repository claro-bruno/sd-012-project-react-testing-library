import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa componente Pokémon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa se renderiza um card com as informações do pokemon', () => {
    const pokemon = screen.getByText(/more details/i);
    userEvent.click(pokemon);

    const name = screen.getByTestId(/pokemon-name/i);
    expect(name).toBeDefined();
    const type = screen.getByTestId(/pokemon-type/i);
    expect(type).toBeDefined();
    const weight = screen.getByTestId(/pokemon-weight/i);
    expect(weight).toBeDefined();
    const SRC = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const srcImg = screen.getAllByRole('img');
    expect(srcImg[0]).toHaveAttribute('src', SRC);
    expect(srcImg[0]).toHaveAttribute('alt', 'Pikachu sprite');
  });
});
