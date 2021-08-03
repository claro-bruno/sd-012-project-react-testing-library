import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente "About".', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText(/About Pokédex/i);
    expect(heading.localName).toBe('h2');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { getAllByText } = renderWithRouter(<About />);
    const paragraph = getAllByText(/Pokémons/i);
    expect(paragraph.length).toBe(2);
  });

  it('Testa se a página contém a imagem de uma Pokédex.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const image = getByRole('img');
    const imagePath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(imagePath);
  });
});
