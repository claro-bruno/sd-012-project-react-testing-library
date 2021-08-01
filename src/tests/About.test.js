import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Tests About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('tests if there are 2 paragraphs in the document', () => {
    const pokedexParagraphs = screen.getAllByText(/pokémons/i);
    expect(pokedexParagraphs).toHaveLength(2);
  });

  it('tests if there is some heading with "About Pokédex"', () => {
    const titleAbout = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(titleAbout.innerHTML).toStrictEqual('About Pokédex');
  });

  it('tests if there is some pokedex image', () => {
    const srcImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = screen.getByRole('img', { name: 'Pokédex' });
    expect(pokedexImage.src).toStrictEqual(srcImage);
  });
});
