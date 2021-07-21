import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes do componente About', () => {
  test('Verifica se a página contém um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Verifica se a página contém uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imageSRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', imageSRC);
  });
});
