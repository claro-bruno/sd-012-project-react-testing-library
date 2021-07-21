import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

const { screen } = require('@testing-library/react');

describe('Testa o componente About.js', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = 'This application simulates a Pokédex,';
    const p2 = ' a digital encyclopedia containing all Pokémons';
    const p = screen.getByText(p1 + p2);
    expect(p).toBeInTheDocument();
    const p3 = 'One can filter Pokémons by type,';
    const p4 = ' and see more details for each one of them';
    const pp = screen.getByText(p3 + p4);
    expect(pp).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
