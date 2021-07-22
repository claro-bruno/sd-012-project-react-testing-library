import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Verfica About.js', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInfo1 = screen.getByText(/This application simulates a Pokédex,/i);
    expect(pokedexInfo1).toBeInTheDocument();

    const pokedexInfo2 = screen.getByText(/One can filter Pokémons by type,/i);
    expect(pokedexInfo2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveProperty('src', imgURL);
  });
});
