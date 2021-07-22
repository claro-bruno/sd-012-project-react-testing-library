import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Check if About.js is working as it should', () => {
  afterEach(cleanup);

  it('Check if there is a heading h2 with text "About Pokedex"', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/About Pokédex/i);
    expect(title.tagName).toBe('H2');
  });
  it('Check if there are two paragraphs and its content', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p1).toBeInTheDocument();
    expect(p1.tagName).toBe('P');
    expect(p2).toBeInTheDocument();
    expect(p2.tagName).toBe('P');
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs.length).toBe(2);
    const textType = paragraphs
      .map((paragraph) => paragraph.tagName)
      .find((tType) => tType !== 'P');
    expect(textType).toBe(undefined);
  });
  it('Check if the About.js page has the correct image', () => {
    renderWithRouter(<About />);
    const imgPath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img', { src: imgPath });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(imgPath);
  });
});
