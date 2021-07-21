import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';

import renderWithRouter from '../renderWithRouter';

describe('Teste do componente About.js', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const teste = screen.getAllByText(/pokémons/i);
    expect(teste.length).toBe(2);
    expect(teste[0]).toBeInTheDocument();
    expect(teste[1]).toBeInTheDocument();
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const teste = screen.getByRole('heading', { type: 'h2' });
    expect(teste).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const teste = screen.getAllByText(/pokémons/i);
    expect(teste.length).toBe(2);
  });

  it(`Teste se a página contém a seguinte imagem de uma Pokédex:
   https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`, () => {
    renderWithRouter(<About />);
    const teste = screen.getByAltText('Pokédex');
    expect(teste).toBeInTheDocument();
    expect(teste.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
