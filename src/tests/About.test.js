import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../rota/renderWithRoute';
import About from '../components/About';

describe('Testa About.js', () => {
  it('Testa info da Pokedex(h2)', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('Testa dois paragrafos', () => {
    renderWithRouter(<About />);
    const pOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(pOne).toBeInTheDocument();
    const pTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(pTwo).toBeInTheDocument();
  });

  it('Testa imagem About', () => {
    renderWithRouter(<About />);
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexIMG = screen.getByRole('img');
    expect(pokedexIMG).toBeInTheDocument();
    expect(pokedexIMG.src).toBe(img);
  });

  // tive de criar uma outra variavel pois o teste nao passava apenas com a variavel img
});
