import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('testa componente About', () => {
  it('testa renderização do about', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();

    const paragraph1 = screen.getByText(/This application simulates a Pokédex, /i);
    expect(paragraph1).toBeInTheDocument();

    const paragraph2 = screen.getByText(/One can filter Pokémons by type, /i);
    expect(paragraph2).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /Pokédex/i });
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
