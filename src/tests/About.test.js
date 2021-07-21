import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa todo About.js', () => {
  it('renderiza "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingAbout = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(headingAbout).toBeVisible();
  });

  it('renderiza dois parágrafos', () => {
    renderWithRouter(<About />);

    const firstText = /This application simulates a Pokédex/i;
    const secondText = /One can filter Pokémons by type/i;

    const firstParagraph = screen.getByText(firstText);
    expect(firstParagraph).toBeVisible();

    const secondParagraph = screen.getByText(secondText);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('renderiza a imagem', () => {
    renderWithRouter(<About />);

    const IMG_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', IMG_URL);
  });
});
