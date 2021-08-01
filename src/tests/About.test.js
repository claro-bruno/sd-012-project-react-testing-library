/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    const paragraphQuant = getAllByText(/Pokémons/);
    expect(paragraphQuant.length).toBe(2);
  });
  test('Teste se a página contém uma imagem de Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImage = getByRole('img');
    expect(pokedexImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
