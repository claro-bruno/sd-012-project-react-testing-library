import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const SRC_POKEDEX = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
const PARAGRAPH_1 = /This application simulates a Pokédex,/;
const PARAGRAPH_2 = /One can filter Pokémons by type,/;

describe('Testa componente About', () => {
  it(`Verifica se existe um reading h2 com o texto "About Pokédex", dois parágrafos
  com texto sobre a Pokédex e a imagem de uma pokedex`, () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    expect(screen.getByRole('heading', { name: /About Pokédex/i, level: 2 }));
    expect(screen.getByText(PARAGRAPH_1)).toBeInTheDocument();
    expect(screen.getByText(PARAGRAPH_2)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', SRC_POKEDEX);
  });
});
