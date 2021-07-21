import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => renderWithRouter(<About />));
afterEach(cleanup);

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  test('Teste se a página contém uma imagem', () => {
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAlt = screen.getByAltText('Pokédex');
    expect(imgAlt.src).toBe(link);
  });
});
