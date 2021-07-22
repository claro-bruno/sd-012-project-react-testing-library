import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2 - About.test', () => {
  test('1- Testa se renderiza a página Pokédex', () => {
    renderWithRouter(<About />);
  });
  test('2- Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const PokeH2 = (screen.getByRole('heading',
      {
        level: 2, name: /About Pokédex/i,
      }));
    expect(PokeH2).toBeInTheDocument();
  });

  test('3- Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraphPokex = (screen.getAllByText(/pokémons/i));
    expect(paragraphPokex.length).toBe(2);
  });

  test('4- Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
