import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa se a página contém as informações sobre a Pokédex', () => {
  it('Testa se a página contém um h2 com o texto About Pokedex', () => {
    renderWithRouter(<About />);
    const aboutPoke = screen.getByRole('heading', { level: 2 });
    expect(aboutPoke).toBeInTheDocument();

    const h2Text = 'About Pokédex';
    expect(screen.getByText(h2Text)).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstTextContent = /This application simulates a Pokédex/i;
    const firstText = screen.getByText(firstTextContent);
    expect(firstText).toBeInTheDocument();
    const secondTextContent = /One can filter Pokémons by type/i;
    const secondText = screen.getByText(secondTextContent);
    expect(secondText).toBeInTheDocument();
  });

  it('Testa se a página contém a imagem do link abaixo', () => {
    renderWithRouter(<About />);
    const IMG_LINK = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toBe(IMG_LINK);
  });
});
