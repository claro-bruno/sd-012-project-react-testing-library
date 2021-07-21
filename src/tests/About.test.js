import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

describe('testa o componente about', () => {
  it('testa se about page tem informacoes da pokedex', () => {
    renderWithRouter(<About />);
    const infoAbout = screen.getByText(/about Pokédex/i);
    expect(infoAbout).toBeInTheDocument();
  });

  it('testa se a pagina tem um heading', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(header).toBeInTheDocument();
  });

  it('testa se a pagina possui 2 paragrafos', () => {
    renderWithRouter(<About />);
    const paragrafo1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragrafo2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });

  it('testa se a pagina possui imagem especifica', () => {
    renderWithRouter(<About />);
    const imagem = screen.getByRole('img');
    expect(imagem).toBeInTheDocument();
    expect(imagem.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
