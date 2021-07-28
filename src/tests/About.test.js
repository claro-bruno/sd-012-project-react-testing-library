import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('Teste se a página contém um heading `h2` com o texto `About Pokédex`', () => {
  renderWithRouter(<About />);
  const headingType = screen.getByRole('heading', { level: 2 });
  expect(headingType).toHaveTextContent('About Pokédex');
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const text1 = /This application/i;
  const text2 = /One can filter/i;
  expect(screen.getByText(text1)).toBeInTheDocument();
  expect(screen.getByText(text2)).toBeDefined();
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
