import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Test "About" component', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Test if component "About" contains "h2" element', () => {
    const h2Subtitle = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2Subtitle).toBeInTheDocument();
  });

  it('Test if page contains two paragraphs', () => {
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Test if page contains specific Pokedex image', () => {
    const pokedexImage = screen.getByRole('img');
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', imageSrc);
    expect(pokedexImage).toHaveAttribute('alt', 'Pokédex');
  });
});
