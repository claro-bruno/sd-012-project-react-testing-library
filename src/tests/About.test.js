import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa About', () => {
  const { getByRole, getByText } = screen;
  test('Testa se about contém informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    expect(getByRole('heading', { name: /about pokédex/i })).toBeDefined();

    expect(getByText(/This application simulates a Pokédex,/i)).toBeDefined();
    expect(getByText(/One can filter Pokémons by type,/i)).toBeDefined();

    const SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(getByRole('img')).toHaveAttribute('src', SRC);
  });
});
