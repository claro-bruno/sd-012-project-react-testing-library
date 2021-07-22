import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa pagina Details', () => {
  const { history } = renderWithRouter(<App />);

  const detailsLink = screen.getByRole('link', { name: /More details/i });
  expect(detailsLink).toBeInTheDocument();
  userEvent.click(detailsLink);
  const pathDetails = history.location.pathname;
  expect(pathDetails).toBe('/pokemons/25');

  const title = screen.getByRole('heading', { name: /Pikachu Details/i });
  expect(title).toBeInTheDocument();

  const summary = screen.getByRole('heading', { name: /Summary/i });
  expect(summary).toBeInTheDocument();

  const summaryText = screen.getByText(/This intelligent Pokémon roasts hard berries/i);
  expect(summaryText).toBeInTheDocument();

  const locations = screen.getByRole('heading', { name: /Game Locations of Pikachu/i });
  expect(locations).toBeInTheDocument();

  const location1 = screen.getByText(/Kanto Viridian Forest/i);
  expect(location1).toBeInTheDocument();

  const location2 = screen.getByText(/Kanto Power Plant/i);
  expect(location2).toBeInTheDocument();

  const images = screen.getAllByRole('img');
  expect(images[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(images[1]).toHaveProperty('alt', 'Pikachu location');
  expect(images[2]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(images[2]).toHaveProperty('alt', 'Pikachu location');

  const checkBox = screen.getByRole('checkbox');
  expect(checkBox).toBeInTheDocument();

  const label = screen.getByText(/Pokémon favoritado?/i);
  expect(label).toBeInTheDocument();
});
