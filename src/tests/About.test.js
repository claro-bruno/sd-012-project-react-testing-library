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

    const texto1 = 'this application simulates a Pokédex, a'
    + ' digital encyclopedia containing all Pokémons';
    const paragrafo1 = screen.getByText(texto1);
    expect(paragrafo1.tagName).toBe('P');
    expect(paragrafo1).toBeInTheDocument();

    const texto2 = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const paragrafo2 = screen.getByText(texto2);
    expect(paragrafo2.tagName).toBe('P');
    expect(paragrafo2).toBeInTheDocument();
  });

  it('Se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe('IMG');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
