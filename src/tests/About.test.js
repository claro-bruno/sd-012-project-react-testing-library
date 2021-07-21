import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa page About', () => {
  const { history } = renderWithRouter(<App />);
  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
  const pathAbout = history.location.pathname;
  expect(pathAbout).toBe('/about');

  const aboutPokedex = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(aboutPokedex).toBeInTheDocument();

  const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
  expect(firstParagraph).toBeInTheDocument();

  const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
  expect(secondParagraph).toBeInTheDocument();

  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
