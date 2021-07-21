import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes do componente <About.js />', () => {
  it('Testa se a página contém as informações sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const pokedex = screen.getByText(/This application simulates a Pokédex/i);

    expect(pokedex).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto "About Pokedex"', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 }).innerHTML;

    expect(heading).toBe('About Pokédex');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokedex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem de uma pokedex', () => {
    renderWithRouter(<About />);
    const { src } = screen.getByRole('img');

    expect(src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
