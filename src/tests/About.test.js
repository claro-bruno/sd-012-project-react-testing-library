import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o component About', () => {
  beforeEach(() => render(<About />));

  test('Testa se a página contém as informações sobre a Pokédex', () => {
    const about = screen.getByText(/About Pokédex/i);
    expect(about).toBeDefined();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeDefined();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const twoParagraphs = screen.getAllByText(/Pokémons/i);
    const size = 2;
    expect(twoParagraphs.length).toBe(size);
  });

  test('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgage = screen.getByRole('img', { name: /Pokédex/i });
    expect(imgage).toBeDefined();
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgage.src).toBe(src);
  });
});
