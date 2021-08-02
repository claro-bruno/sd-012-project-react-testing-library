import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testando o componente "About"', () => {
  it('Verifica se existe um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(h2).toBeInTheDocument();
  });

  it('Verifica a existência de dois parágrafos com textos sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText(/this application simulates a pokédex, a/i);
    const paragraph2 = screen.getByText(/one can filter pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const URL_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', URL_IMG);
  });
});
