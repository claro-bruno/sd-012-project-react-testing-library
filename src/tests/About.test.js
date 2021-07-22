// requisito 2
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('if About tests:', () => {
  test('info about pokédex working', () => {
    renderWithRouter(<About />);
    const info1 = screen.getByText(/simulates a pokédex/i);
    const info2 = screen.getByText(/filter pokémons by type/i);

    expect(info1).toBeInTheDocument();
    expect(info2).toBeInTheDocument();
  });

  test('"About" working', () => {
    renderWithRouter(<About />);
    const about = screen.getByRole('heading', { name: /about pokédex/i });
    expect(about).toBeInTheDocument();
  });

  test('image working', () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgURL);
  });
});
