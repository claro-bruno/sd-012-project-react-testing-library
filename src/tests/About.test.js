import React from 'react';
import { screen } from '@testing-library/react';

import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInfo1 = screen.getByText(/digital encyclopedia/i);
    const pokedexInfo2 = screen.getByText(/filter pokémons by type/i);
    expect(pokedexInfo1).toBeInTheDocument();
    expect(pokedexInfo2).toBeInTheDocument();
  });
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: /about pokédex/i });
    expect(h2).toBeInTheDocument();
  });
  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const regExp = /digital encyclopedia|filter pokémons by type/i;
    const paragraphs = screen.getAllByText(regExp);
    expect(paragraphs).toHaveLength(2);
  });
  test('Testa se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const expectedURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { src: expectedURL });
    expect(img.src).toBe(expectedURL);
  });
});
