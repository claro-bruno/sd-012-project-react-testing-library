import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import About from '../components/About';

// prettier-ignore
describe('Requisito 2', () => {
  it('2.1 - Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p = screen.getByText(/This application simulates a Pokédex/i);
    expect(p).toBeInTheDocument();
  });
  it('2.2 - Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByText(/About Pokédex/i);
    expect(h2).toBeInTheDocument();
  });
  it('2.3 - Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p = screen.getAllByText(/Pokémons/);
    expect(p.length).toBe(2);
  });
  it('2.4 - Teste se a página contém imagem de uma Pokédex específica.', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText(/Pokédex/);
    expect(img).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
