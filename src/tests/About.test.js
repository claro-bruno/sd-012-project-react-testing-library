import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o componente About.js', () => {
  test('Deve mostrar informação sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutElement = screen.getByText(/About Pokédex/i);
    expect(aboutElement).toBeInTheDocument();
  });

  test('Deve conter um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading');
    const headingText = screen.getByText('About Pokédex');
    expect(h2).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
  });

  test('Deve contar 2 parágrafos de texto', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Deve conter uma imagem da Pokédex já definida', () => {
    renderWithRouter(<About />);
    const imgElement = screen.getByAltText(/Pokédex/i);
    expect(imgElement.getAttribute('src')).toEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
