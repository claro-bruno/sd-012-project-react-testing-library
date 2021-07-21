import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2. Teste o componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphs = screen.getAllByText(/,/);
    expect(paragraphs.length).toBe(2);
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe(imgURL);
  });
});
