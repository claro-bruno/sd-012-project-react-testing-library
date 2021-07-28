import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste do link "Home"', () => {
  const { history } = renderWithRouter(<App />);
  const linkHome = screen.getByText('Home');
  expect(linkHome).toBeInTheDocument();
  fireEvent.click(linkHome);
  const homePath = history.location.pathname;
  expect(homePath).toBe('/');
});

test('Teste do link "About"', () => {
  const { history } = renderWithRouter(<App />);
  const linkAbout = screen.getByText('About');
  expect(linkAbout).toBeInTheDocument();
  fireEvent.click(linkAbout);
  const aboutPath = history.location.pathname;
  expect(aboutPath).toBe('/about');
});

test('Teste do link "Favorite Pokémons"', () => {
  const { history } = renderWithRouter(<App />);
  const linkFavorite = screen.getByText('Favorite Pokémons');
  expect(linkFavorite).toBeInTheDocument();
  fireEvent.click(linkFavorite);
  const favoritePokemonsPath = history.location.pathname;
  expect(favoritePokemonsPath).toBe('/favorites');
});
