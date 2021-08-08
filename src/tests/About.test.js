import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste o componente About.js', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragUm = screen.getByText(/This application simulates a Pokédex/i);
    const paragDois = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragUm).toBeInTheDocument();
    expect(paragDois).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
