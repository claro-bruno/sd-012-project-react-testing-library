import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import About from '../components/About';

describe('Testa página About', () => {
  it('Verifica se renderiza página About', () => {
    const { history } = renderWithRouter(<About />);
    history.push('/about');
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se página About contém um h2 com texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeDefined();
  });

  it('Verifica se página contém dois parágrafos com texto', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex, a digital/i);
    const p2 = screen.getByText(/One can filter Pokémons by type, and see more details/i);
    expect(p1).toBeDefined();
    expect(p2).toBeDefined();
  });

  it('Verifica se página contém uma imagem', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');

    expect(image).toBeDefined();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
