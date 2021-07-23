import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa página About', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Testa se tem o título na página', () => {
    const titulo = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(titulo).toBeInTheDocument();
  });

  it('Testa se tem os parágrafo no trem', () => {
    const paragrafos = screen.getAllByText(/pokémons/i);
    expect(paragrafos.length).toBe(2);
  });

  const FTINHA = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  it('Testa se tem a imagem bem lindona lá', () => {
    const imagem = screen.getByRole('img');
    expect(imagem).toHaveAttribute('src', FTINHA);
  });
});
