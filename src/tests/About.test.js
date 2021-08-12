import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/RenderWithRouter';

describe('Testa todo o componente About', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const content = screen.getByRole('heading');
    expect(content.tagName).toBe('H2');
    expect(content).toHaveTextContent(/About Pokédex/i);
  });
  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex, /i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type, /i);
    expect(paragraph1.tagName).toBe('P');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2.tagName).toBe('P');
    expect(paragraph2).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('src', url);
  });
});
