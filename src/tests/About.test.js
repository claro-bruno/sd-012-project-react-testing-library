import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste do component About.js.', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const h2AboutPokedex = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(h2AboutPokedex).toBeInTheDocument();
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const firstParagraphAbout = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraphAbout = screen.getByText(/One can filter Pokémons by type,/);

    expect(firstParagraphAbout).toBeInTheDocument();
    expect(secondParagraphAbout).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex: ', () => {
    renderWithRouter(<About />);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAbout = screen.getByRole('img');

    expect(imgAbout.src).toBe(imgSrc);
  });
});
