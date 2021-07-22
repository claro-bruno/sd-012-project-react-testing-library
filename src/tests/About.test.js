import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <About.js />', () => {
  test('Teste se a página contém um header "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', {
      name: 'About Pokédex',
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const p1sentence1 = 'This application simulates a Pokédex,';
    const p1sentence2 = ' a digital encyclopedia containing all Pokémons';
    const p1 = screen.getByText(p1sentence1 + p1sentence2);
    const p2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imageURL = screen.getByRole('img');

    expect(imageURL).toBeInTheDocument();
    expect(imageURL).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
