import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from './RenderWithRouter';

describe('Testando o componente About.js', () => {
  beforeEach(() => {
    RenderWithRouter(<About />);
  });
  test('Testando se a pagina contém as info sobre a Pokédex', () => {
    const heading = screen.getByText(/This application simulates a Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraphOneContent = /This application simulates a Pokédex/i;

    const paragraphOne = screen.getByText(paragraphOneContent);

    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwoContent = /One can filter Pokémons by type,/i;

    const paragraphTwo = screen.getByText(paragraphTwoContent);

    expect(paragraphTwo).toBeInTheDocument();
  });
  test('Teste se a pagina contém uma imagem específica', () => {
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
