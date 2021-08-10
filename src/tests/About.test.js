import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Verifica se contém um H2 com o texto About Pokedex', () => {
    const about = screen.getByRole('heading', { level: 2 });
    expect(about).toBeInTheDocument();

    const h2Text = 'About Pokédex';
    expect(screen.getByText(h2Text)).toBeInTheDocument();
  });

  it('Verifica há dois parágrafos com texto Pokemons', () => {
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Verifica se a página possuí um link', () => {
    const IMG_LINK = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toBe(IMG_LINK);
  });
});