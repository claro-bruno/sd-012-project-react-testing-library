import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa Navegação a partir da Home', () => {
  const { history } = renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: /Home/i });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);
  const pathHome = history.location.pathname;
  expect(pathHome).toBe('/');

  const aboutLink = screen.getByRole('link', { name: /About/i });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
  const pathAbout = history.location.pathname;
  expect(pathAbout).toBe('/about');

  history.push('/');

  const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);
  const pathFavorite = history.location.pathname;
  expect(pathFavorite).toBe('/favorites');

  history.push('/pagina-que-nao-existe');

  const noMatch = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(noMatch).toBeInTheDocument();
});
