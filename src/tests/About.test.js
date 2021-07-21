import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Verifica About.js', () => {
  it('Testa h2 com texto "About Pokédex" ', () => {
    render(<About />);
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página tem dois parágrafos', () => {
    render(<About />);
    const paragrafos = screen.getAllByText(/Pokémons/i);
    expect(paragrafos.length).toBe(2);
  });

  it('Testa se a página tem a imagem', () => {
    render(<About />);
    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
