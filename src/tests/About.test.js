import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa About', () => {
  test('Testa se about contém informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    expect(screen.getByRole('heading', { name: /about pokédex/i })).toBeDefined();

    const TEXT_A = /This application simulates a Pokédex,/i;
    const TEXT_B = /One can filter Pokémons by type,/i;

    expect(screen.getByText(TEXT_A)).toBeDefined();
    expect(screen.getByText(TEXT_B)).toBeDefined();

    const SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img')).toHaveAttribute('src', SRC);
  });
});
