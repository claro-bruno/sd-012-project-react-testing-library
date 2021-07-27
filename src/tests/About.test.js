import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('test text', () => {
  it('test h2', () => {
    // render the page
    renderWithRouter(<About />);
    // get element
    const h2 = screen.getByText(/about pokédex/i);
    // test element
    expect(h2.tagName).toBe('H2');
  });

  it('test p', () => {
    // render the page
    renderWithRouter(<About />);
    const pFirst = 'This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons';
    const pSecond = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';
    // get element
    const p1 = screen.getByText(pFirst);
    const p2 = screen.getByText(pSecond);
    // test element

    expect(p1.tagName).toBe('P');
    expect(p2.tagName).toBe('P');
  });
});

describe('test img', () => {
  it('img of pokedex', () => {
    // render the page
    renderWithRouter(<About />);
    // get the element
    const img = screen.getByRole('img');
    // test element
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
