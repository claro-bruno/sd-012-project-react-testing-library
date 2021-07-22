import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Verifica About.js', () => {
  test('Testa se a página tem informações sobre a pokedex, h2 e imagem', () => {
    renderWithRouter(<About />);

    const subtitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(subtitle).toBeDefined();

    const PARAGRAPH_ONE = /This application simulates a Pokédex,/i;
    const PARAGRAPH_TWO = /One can filter Pokémons by type,/i;

    expect(screen.getByText(PARAGRAPH_ONE)).toBeInTheDocument();
    expect(screen.getByText(PARAGRAPH_TWO)).toBeDefined();

    const SRC_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img')).toHaveAttribute('src', SRC_IMG);
  });
});
