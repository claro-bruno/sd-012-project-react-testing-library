import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testando funcionalidades do App', () => {
  renderWithRouter(<App />);
  const homeLink = screen.getByRole('link', { name: /Home/i });
  const aboutLink = screen.getByRole('link', { name: /About/i });
  const favPokeLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

  expect(homeLink).toBeInTheDocument();
  expect(favPokeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
});

test('Testando redirecionamento da home', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(screen.getByText(/Home/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('Testando redirecionamento do About', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(screen.getByText(/About/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('Testando redirecionamento do Favorite Pokemons', () => {
  const { history } = renderWithRouter(<App />);
  userEvent.click(screen.getByText(/Favorite Pokémons/i));
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('Testando redirecionamento do Not Found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/digimon');
  expect(screen.getByAltText('Pikachu crying because the page requested was not found'));
});
