import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o componente About.js', () => {
  beforeEach(() => {
    RenderWithRouter(<About />);
  });
  test('Testando se a pagina contém as info sobre a Pokédex', () => {
    const pokeInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(pokeInfo).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2aboutpoke = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(h2aboutpoke).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);

    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(/One can filter Pokémons by type,/i);

    expect(paragraph2).toBeInTheDocument();
  });
  test('Teste se a pagina contém uma imagem específica', () => {
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
