import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('2-Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const aboutH2 = screen.getByRole('heading', { level: 2 });
    expect(aboutH2).toHaveTextContent('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const p1 = /This application simulates/i;
    const p2 = /One can filter Pokémons by type/i;
    expect(screen.getByText(p1)).toBeInTheDocument();
    expect(screen.getByText(p2)).toBeInTheDocument();
  });

  test('Teste se a página contém link de imagem de uma Pokédex:', () => {
    const imgLink = screen.getByRole('img');
    expect(imgLink).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
