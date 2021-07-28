import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa About.js', () => {
  beforeEach(() => render(<About />));

  it('Existe um heading h2 com o texto About Pokédex', () => {
    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeDefined();
  });

  it('Existem dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/Pokémons/i);
    const size = 2;
    expect(paragraphs.length).toBe(size);
  });

  it('Existe imagem de uma Pokédex', () => {
    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAlt = 'Pokédex';
    const imageTestOne = screen.getByAltText(imageAlt);
    const imageTextTwo = screen.getByRole('img');
    expect(imageTestOne).toBeDefined();
    expect(imageTextTwo.src).toBe(imageURL);
  });
});
