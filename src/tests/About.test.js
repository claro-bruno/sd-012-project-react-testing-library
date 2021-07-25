import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.js', () => {
  test('Testa se página contem h2 com texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2About = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2About).toBeDefined();
  });

  test('Testa se página contém dois parágrafos com texto sobre Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText('This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons');
    const secondParagraph = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');

    expect(firstParagraph).toBeDefined();
    expect(secondParagraph).toBeDefined();
  });

  test('Testa se página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgPath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAbout = screen.getByRole('img');
    expect(imgAbout).toBeDefined();
    const { src } = imgAbout;
    expect(src).toBe(imgPath);
  });
});
