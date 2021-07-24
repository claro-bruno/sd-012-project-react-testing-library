import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Teste do componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex  ', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex ', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getAllByText(/Pokémons/i);
    expect(paragraph).toHaveLength(2);
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const getImg = screen.getByRole('img');
    expect(getImg).toHaveAttribute('src', image);
  });
});
