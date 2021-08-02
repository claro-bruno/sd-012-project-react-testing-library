import { render, screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
// import renderWithRouter from './renderWithRouter';

describe('Requisito 2 -  Testando o componente <About.js />', () => {
  beforeEach(() => render(<About />));

  it('1. Teste se a página contém as informações sobre a Pokédex.', () => {
    // renderWithRouter(<About />);
    const infos = screen.getByText(/simulates a Pokédex/);

    expect(infos).toBeInTheDocument();
  });

  it('2. Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    // renderWithRouter(<About />);
    const headingH2 = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(headingH2).toBeInTheDocument();
  });

  it('3. Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    // renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);

    expect(paragraphs.length).toBe(2);
  });

  it('4. Teste se a página uma imagem específica de uma Pokédex:', () => {
    // renderWithRouter(<About />);
    const img = screen.getByAltText('Pokédex');
    const src = img.getAttribute('src');
    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
