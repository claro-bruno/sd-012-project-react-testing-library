import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { About } from '../components';

describe('Verifica o componente "About.js"', () => {
  test('Verifica se contém a tag "h2" com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2Title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2Title).toBeDefined();
  });

  test('Verifica se contém dois parágrafos', () => {
    renderWithRouter(<About />);
    const firstText = /This application simulates a Pokédex/i;
    const secondText = /One can filter Pokémons by type/i;
    const foundText1 = screen.getByText(firstText);
    const foundText2 = screen.getByText(secondText);
    expect(foundText1).toBeDefined();
    expect(foundText2).toBeDefined();
  });

  test('Verifica se contém a imagem da Pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
