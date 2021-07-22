import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa About', () => {
  test('Testa se about contém informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', { name: /about pokédex/i })).toBeDefined();

    expect(screen.getByText(/This application simulates a Pokédex,/i)).toBeDefined();
    expect(screen.getByText(/One can filter Pokémons by type,/i)).toBeDefined();

    const SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img')).toHaveAttribute('src', SRC);
  });
});
