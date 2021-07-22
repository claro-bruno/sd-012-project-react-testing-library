import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa About.js', () => {
  beforeEach(() => renderWithRouter(<App />));

  it('Existe um heading h2 com o texto About Pokédex', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const title = screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeDefined();
  });

  it('Existem dois parágrafos com texto sobre a Pokédex', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const paragraphOne = 'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons';
    const paragraphTwo = 'One can filter Pokémons by type, '
      + 'and see more details for each one of them';

    const paragraphOneTest = screen.getAllByText(paragraphOne);
    const paragraphTwoTest = screen.getAllByText(paragraphTwo);

    expect(paragraphOneTest).toBeDefined();
    expect(paragraphTwoTest).toBeDefined();
  });

  it('Existe imagem de uma Pokédex', () => {
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);

    const imageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAlt = 'Pokédex';

    const imageTestOne = screen.getByAltText(imageAlt);
    const imageTextTwo = screen.getByRole('img');

    expect(imageTestOne).toBeDefined();
    expect(imageTextTwo.src).toBe(imageURL);
  });
});
