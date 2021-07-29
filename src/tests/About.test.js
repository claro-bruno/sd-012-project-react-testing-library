import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente About', () => {
  beforeEach(() => {
    RenderWithRouter(<About />);
  });

  test('Testa se a página contém as informações sobre a Pokédex.', () => {
    const pokedexInfo = screen.getByText(/this application simulates a pokédex/i);
    expect(pokedexInfo).toBeDefined();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(heading).toBeDefined();
  });

  test('Testa se a página contém dois parágrafos com o texto sobre a Pokédex.', () => {
    const paragraph = screen.getByText(/this application simulates a pokédex/i);
    expect(paragraph).toBeDefined();
    const secondParagraph = screen.getByText(/one can filter pokémons by type,/i);
    expect(secondParagraph).toBeDefined();
  });

  test('Testa se a página contém a seguinte imagem de uma pokédex', () => {
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
