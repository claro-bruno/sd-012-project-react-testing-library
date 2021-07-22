import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderwithRouter';

describe('Testing component About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('the page contain a "h2" with text "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('the page contain a two paragraphs with text about Pokédex', () => {
    const text1 = screen.getByText(/this application/i);
    const text2 = screen.getByText(/one can filter/i);
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });

  it('the page contain image a Pokédex', () => {
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByAltText(/pokédex/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', src);
  });
});
