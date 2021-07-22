import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  it('Testa informações sobre Pokédex', () => {
    render(<About />);

    const p1 = screen.getByText('This application simulates a Pokédex', { exact: false });

    const p2 = screen.getByText('One can filter Pokémons by type, and', { exact: false });

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Testa h2 com texto About Pokédex ', () => {
    render(<About />);

    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent('About Pokédex');
  });

  it('Testa se págica contém imagem expecífica', () => {
    render(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
