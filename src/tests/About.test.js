import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('testa se o About.js', () => {
  it('contem heading com texto about pokédex', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutText).toBeInTheDocument();
  });

  it('contem dois p com texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const numberOfP = screen.getAllByText(/Pokémons/);
    expect(numberOfP).toHaveLength(2);
  });
  it('contem imagem específica de Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

/* referencias
- https://testing-library.com/docs/queries/bytext
- https://testing-library.com/docs/queries/byalttext
*/
