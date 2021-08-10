import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import render from './renderWithRouter';

describe('Verifica elementos presente na página About.', () => {
  beforeEach(() => render(<About />));
  it('A página contém um heading h2 com o texto "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toBe('About Pokédex');
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const parags = screen.getAllByText(/pokémon/i);
    expect(parags.length).toBe(2);
  });
  it('A página contém uma imagem específica de uma pokedex', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
