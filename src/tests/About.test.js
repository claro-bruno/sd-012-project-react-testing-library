import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

beforeEach(() => {
  renderWithRouter(<About />);
});
describe('Testando o componente About.js', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('About Pokédex');
  });

  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const firstPartText = 'This application simulates a Pokédex,';
    const secondPartText = 'a digital encyclopedia containing all Pokémons';
    const firstParagraph = screen.getByText(
      `${firstPartText} ${secondPartText}`,
    );
    expect(firstParagraph).toBeInTheDocument();
    const secondParagraph = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem de uma Pokédex', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
