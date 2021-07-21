import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

beforeEach(() => {
  render(<About />);
});

const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testa o componente <About />', () => {
  it('testa h2 com texto About Pokédex', () => {
    const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('testa 2 paragrafos', () => {
    const paragraf1 = screen.getByText(/This application simulates a Pokédex/);
    const paragraf2 = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraf1).toBeDefined();
    expect(paragraf2).toBeDefined();
  });

  it('testa a img', () => {
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toHaveAttribute('src', URL);
  });
});
