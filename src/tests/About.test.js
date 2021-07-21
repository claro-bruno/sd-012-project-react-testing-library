import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Testa se a página contém um h2 com o texto About Pokedex', () => {
    const aboutPoke = screen.getByRole('heading', { level: 2 });
    expect(aboutPoke).toBeInTheDocument();

    const h2Text = 'About Pokédex';
    expect(screen.getByText(h2Text)).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Testa se a página contém a imagem do link abaixo', () => {
    const IMG_LINK = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toBe(IMG_LINK);
  });
});
