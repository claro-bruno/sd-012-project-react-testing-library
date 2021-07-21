import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('testa About.js', () => {
  it('testa o h2', () => {
    renderWithRouter(<About />);
    const aboutTxt = screen.getByText('About Pokédex');
    expect(aboutTxt).toBeInTheDocument();
  });
  it('testa os paragrafos', () => {
    renderWithRouter(<About />);
    const
      t1 = 'This application simulates a Pokédex,';
    const
      t11 = ' a digital encyclopedia containing all Pokémons';
    const
      t2 = 'One can filter Pokémons by type, and see more details for each one of them';
    const paragrafo1 = screen.getByText(t1 + t11);
    const paragrafo2 = screen.getByText(t2);
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });
  it('testa imagem', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByAltText('Pokédex');
    expect(imagem).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
