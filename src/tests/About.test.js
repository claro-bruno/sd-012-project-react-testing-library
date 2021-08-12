import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    const firstParagraphContent = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const firstParagraph = screen.getByText(firstParagraphContent);
    const secondParagraphContent = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const secondParagraph = screen.getByText(secondParagraphContent);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const headerAbout = screen.getByRole('heading', { level: 2 });
    expect(headerAbout).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    const pokedexImage = screen.getByRole('img');
    const expectedImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImage.src).toBe(expectedImage);
  });
});
