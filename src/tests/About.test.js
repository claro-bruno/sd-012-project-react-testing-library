import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa os elementos do About', () => {
  it('Heading com About Pokedex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.innerHTML).toBe('About Pokédex');
  });
  it('Existe 2 paragrafos', () => {
    renderWithRouter(<About />);
    const texto1 = screen.getByText('This application simulates a Pokédex, a digital'
     + ' encyclopedia containing all Pokémons');
    expect(texto1).toBeInTheDocument();
    const texto2 = screen.getByText('One can filter Pokémons by type, and see'
     + ' more details for each one of them');
    expect(texto2).toBeInTheDocument();
  });
  it('Existe uma imagem de uma pokedex', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByAltText('Pokédex');
    expect(imagePokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
