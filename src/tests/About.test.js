import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa informações sobre Pokédex em <About.js />.', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Testa descrição da Pokédex em parágrafos', () => {
    const p1 = screen.getByText('This application simulates a Pokédex', { exact: false });

    const p2 = screen.getByText('One can filter Pokémons by type, and', { exact: false });

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Testa h2 com texto About Pokédex ', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Testa se págica contém imagem expecífica', () => {
    const img = screen.getByAltText('Pokédex');
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img.src).toBe(srcImg);
  });
});
