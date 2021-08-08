import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testando o componente About.js', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Testa se a página contém as informações sobre a pokédex', () => {
    const firstParagraphContent = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const firstParagraph = screen.getByText(firstParagraphContent);
    const secondParagraphContent = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const secondParagraph = screen.getByText(secondParagraphContent);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Testa se a página contém um header com o texto About Pokédex', () => {
    const headerAbout = screen.getByRole('heading', { level: 2 });
    expect(headerAbout).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém a seguinte imagem (url) de uma Pokédex', () => {
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
