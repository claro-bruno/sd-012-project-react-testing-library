import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../etc/renderWithRouter';

describe('About.js', () => {
  it('Heading', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Parágrafos', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(p2).toBeInTheDocument();
  });

  it('Imagem', () => {
    renderWithRouter(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', src);
  });
});
