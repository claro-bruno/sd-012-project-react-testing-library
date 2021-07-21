import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2 - Teste o componente <About.js /> ', () => {
  beforeEach(() => render(<About />));
  it('Testa se a página é renderizada com os textos corretamente', () => {
    const paragraphOne = screen.getByText(/This application simulates/i);
    const paragraphTwo = screen.getByText(/One can filter Pokémons/i);
    const title = screen.getByRole('heading');
    expect(paragraphOne).toBeDefined();
    expect(paragraphTwo).toBeDefined();
    expect(title).toHaveTextContent('About Pokédex');
  });

  it('Testa se contém dois parágrafos sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  it('Testa se a página contém a imagem correta', () => {
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
