import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <About.js />', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Teste se a página contém um heading h2 com o texto "About Pokédex".', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const p1 = screen.getByText(/This application simulates a Pokédex/);
    const p2 = screen.getByText(/One can filter Pokémons by type, and see more details/);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it(`Teste se a página contém a seguinte imagem de uma Pokédex:
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`, () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
