import React from 'react';

import { screen } from '@testing-library/react';

import renderWithRouter from './helper';

import About from '../components/About';

const aboutText = {
  p1: 'This application simulates a Pokédex'
    + ', a digital encyclopedia containing all Pokémons',
  p2: 'One can filter Pokémons by type, '
   + 'and see more details for each one of them',
};

describe('Testa componente About', () => {
  it('should render with a about title', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H2');
  });

  it('should render with two P tags', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(aboutText.p1);
    expect(p1).toBeInTheDocument();
  });
  it('should render with two P tags', () => {
    renderWithRouter(<About />);
    const p2 = screen.getByText(aboutText.p2);
    expect(p2).toBeInTheDocument();
  });

  it('should render with a img tag', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
