import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('test if the page has info about the pokedex', () => {
  test('test if the page contains a heading h2 with the text About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const aboutText = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Test if the page has 2 paragraphs with text about the Pokédex', () => {
    const { getAllByText } = renderWithRouter(<About />);

    const paragraphsQuant = getAllByText(/Pokémons/);
    expect(paragraphsQuant.length).toBe(2);
  });

  test('Test if the page has an image of the Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImage = getByRole('img');
    expect(pokedexImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
