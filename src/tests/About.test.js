import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('Testa as informações da página About', () => {
    const urlImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);
    expect(screen.getByText('About Pokédex')).toBeDefined();
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeDefined();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeDefined();
    expect(screen.getByAltText('Pokédex')).toHaveProperty('src', urlImage);
  });
});
