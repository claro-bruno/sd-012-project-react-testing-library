import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Se é renderizado um card com as infos', () => {
  renderWithRouter(<App />);
  const pokeName = screen.getByTestId('pokemon-name');
  const pokeType = screen.getByTestId('pokemon-type');
  const pokeWeight = screen.getByText('Average weight: 6.0 kg');
  const pokeImg = screen
    .getByAltText('Pikachu sprite');
  expect(pokeName).toHaveTextContent('Pikachu');
  expect(pokeType).toHaveTextContent('Electric');
  expect(pokeWeight).toBeInTheDocument();
  expect(pokeImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Navegação para detalhes', () => {
  const { history } = renderWithRouter(<App />);
  const detailsButton = screen.getByRole('link', { name: 'More details' });
  expect(detailsButton).toBeInTheDocument();
  userEvent.click(detailsButton);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('se existe um ícone de estrela nos poke favoritados', () => {
  renderWithRouter(<App />);
  const detailsButton = screen.getByRole('link', { name: 'More details' });
  expect(detailsButton).toBeInTheDocument();
  userEvent.click(detailsButton);
  const checkFav = screen.getByRole('checkbox');
  userEvent.click(checkFav);
  const favIcon = screen.getByAltText('Pikachu is marked as favorite');
  expect(favIcon.src).toBe('http://localhost/star-icon.svg');
});
