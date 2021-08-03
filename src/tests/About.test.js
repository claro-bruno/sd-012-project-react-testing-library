import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Verificando todo o meu component ABOUT', () => {
  it('Se renderiza o component ABOUT com heading `About Pokedex`', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading');
    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  it('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen.getByText('This application simulates a Pokédex, a'
    + ' digital encyclopedia containing all Pokémons');
    const paragraph2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(paragraph1.tagName).toBe('P');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2.tagName).toBe('P');
    expect(paragraph2).toBeInTheDocument();
  });

  it('Se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img');
    const imageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toBeInTheDocument();
    expect(image.tagName).toBe('IMG');
    expect(image).toHaveAttribute('src', imageSource);
    expect(image.src).toBe(imageSource);
  });
});
