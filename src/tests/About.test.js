import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste se a página contém um heading "h2" com o texto "About Pokédex"', () => {
  renderWithRouter(<About />);
  const tagTitle = screen.getByRole('heading');
  expect(tagTitle).toBeInTheDocument();
  expect(tagTitle.innerHTML).toBe('About Pokédex');
});

test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<About />);
  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);
  const informations = screen.getAllByTestId('pokedex-paragraph');
  expect(informations.length).toBe(2);
});
