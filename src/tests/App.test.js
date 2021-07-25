import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('About tests', () => {
  it('Test page subtitle', () => {
    renderWithRouter(<About />);
    const subtitle = screen.getByRole('heading', { name: /about pokédex/i });
    expect(subtitle).toBeInTheDocument();
  });

  it('Test the image URL', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('img')).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });

  it('Page must contains some informations about Pokédex', () => {
    renderWithRouter(<About />);
    const firstInfo = screen.getByText(/application simulates a pokédex/i);
    const secondInfo = screen.getByText(/one can filter pokémons by type/i);

    expect(firstInfo).toBeInTheDocument();
    expect(secondInfo).toBeInTheDocument();
  });
});
