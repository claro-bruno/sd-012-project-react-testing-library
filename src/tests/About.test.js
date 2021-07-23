import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testa About', () => {
  it('Testa se contém heading About Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se contém dois paragrágrafos', () => {
    renderWithRouter(<About />);

    const P1 = /This application simulates a Pokédex, /i;
    const P2 = /One can filter Pokémons by type, /i;

    expect(screen.getByText(P1)).toBeInTheDocument();
    expect(screen.getByText(P2)).toBeInTheDocument();
  });

  it('Testa se contém img da Pokédex', () => {
    renderWithRouter(<About />);

    const IMG_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgComponent = screen.getByRole('img');

    expect(imgComponent).toBeInTheDocument();
    expect(imgComponent).toHaveAttribute('src', IMG_URL);
  });
});
