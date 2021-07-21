import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa componente About', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { level: 2 });
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle.innerHTML).toBe('About Pokédex');
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getByText(
      'This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons',
    );
    expect(paragraph).toBeInTheDocument();
    expect(paragraph[Object.keys(paragraph)[0]].elementType).toBe('p');
    const paragraph2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(paragraph2).toBeInTheDocument();
    expect(paragraph2[Object.keys(paragraph2)[0]].elementType).toBe('p');
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText('Pokédex');
    expect(img[Object.keys(img)[0]].pendingProps.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toBeInTheDocument();
  });
});
