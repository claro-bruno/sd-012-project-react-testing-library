import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando component About', () => {
  beforeEach(() => renderWithRouter(<About />));
  it('tem um h2 com "About Pokédex"', () => {
    const nivel = screen.getByRole('heading', { level: 2 });
    expect(nivel).toBeInTheDocument();
    expect(nivel.innerHTML).toBe('About Pokédex');
  });
  it('tem 2 paragrafos sobre a Pokedex', () => {
    const parag = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    const para2 = screen.getByText('One can filter Pokémons by type, '
    + 'and see more details for each one of them');
    expect(para2).toBeInTheDocument();
    expect(parag).toBeInTheDocument();
  });
  it('contem uma imagem específica', () => {
    const png = screen.getByAltText('Pokédex');
    expect(png.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
