import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente About', () => {
  it('Testa se a págica contém o título "About Pokédex"', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se a página contém a descrição do Pokédex', () => {
    renderWithRouter(<About />);
    const text1 = /This application simulates a Pokédex,/i;
    const text2 = /One can filter Pokémons by type,/i;
    const textFound1 = screen.getByText(text1);
    const textFound2 = screen.getByText(text2);
    expect(textFound1).toBeInTheDocument();
    expect(textFound2).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem do Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText(/Pokédex/i);
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
