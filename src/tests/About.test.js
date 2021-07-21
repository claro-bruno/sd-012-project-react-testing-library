import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testando a aplicação "About"', () => {
  it('Testa se a pagina contem um heading h2 com texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  it('Testa se a pagina contem 1 paragrafo sobre pokedex', () => {
    render(<About />);
    const infoParagraph1 = 'This application simulates a Pokédex, a ';
    const infoParagraph2 = 'digital encyclopedia containing all Pokémons';
    const firstP = screen.getByText(`${infoParagraph1}${infoParagraph2}`);
    expect(firstP).toBeInTheDocument();
  });
  it('Testa se a pagina contem 2 paragrafo sobre pokedex', () => {
    render(<About />);
    const infoParagraph1 = 'One can filter Pokémons by type, ';
    const infoParagraph2 = 'and see more details for each one of them';
    const secondP = screen.getByText(`${infoParagraph1}${infoParagraph2}`);
    expect(secondP).toBeInTheDocument();
  });
  it('Testa se a pagina contem a seguinte imagem', () => {
    render(<About />);
    const img = screen.getByAltText('Pokédex');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
