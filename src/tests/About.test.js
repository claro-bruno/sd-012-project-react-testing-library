import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testando component About', () => {
  it('Testa o subtítulo', () => {
    renderWithRouter(<About />);
    const subtitulo = screen.getByRole('heading', { name: /about pokédex/i });
    expect(subtitulo).toBeInTheDocument();
  });

  it('Testa a URL da imagem', () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgElement = screen.getByRole('img');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement.src).toBe(imgURL);
  });

  it('Testa informações da Pokédex', () => {
    renderWithRouter(<About />);
    const firstInfo = screen.getByText(/application simulates a pokédex/i);
    const secondInfo = screen.getByText(/one can filter pokémons by type/i);

    expect(firstInfo).toBeInTheDocument();
    expect(secondInfo).toBeInTheDocument();
  });
});
