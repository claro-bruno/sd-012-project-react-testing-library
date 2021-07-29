import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../components/RenderWithRouter';

describe('Testes sobre o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it('Testa se a página contém todas as informações sobre a Pokédex', () => {
    const aboutHeader = screen.getByRole('heading', { level: 2 });
    expect(aboutHeader.innerHTML).toBe('About Pokédex');
  });

  it('Verifica se a página contém 2 parágrafos com textos sobre', () => {
    const allParagraphs = screen.getAllByText(/pokémons/i);
    expect(allParagraphs.length).toBe(2);
  });

  it('Verifica se a página tem uma imagem específica de uma pokedex', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
