import React from 'react';
import { screen } from '@testing-library/react';

// import { render, screen } from '@testing-library/react';
// import { Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';

import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Testa se o topo da aplicação contém um conjunto'
    + ' fixo de links de navegação', () => {
  /* const mockHistory = createMemoryHistory();

  render(
    <Router history={ mockHistory }>
      <App />
    </Router>,
  ); */

  const { history } = renderWithRouter(<App />);

  const linkToHome = screen.getByRole('link', { name: /Home/i });
  expect(linkToHome).toBeInTheDocument();

  const linkToAbout = screen.getByRole('link', { name: /About/i });
  expect(linkToAbout).toBeInTheDocument();

  const linkToFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
  expect(linkToFavorites).toBeInTheDocument();

  userEvent.click(linkToHome);
  const titleHome = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(titleHome).toBeInTheDocument();
  const urlHome = history.location.pathname;
  expect(urlHome).toBe('/');

  userEvent.click(linkToAbout);
  const titleAbout = screen.getByRole('heading', { name: /About Pokédex/i });
  expect(titleAbout).toBeInTheDocument();
  const urlAbout = history.location.pathname;
  expect(urlAbout).toBe('/about');

  userEvent.click(linkToFavorites);
  const titleFavorites = screen.getByRole('heading', { name: /Favorite pokémons/i });
  expect(titleFavorites).toBeInTheDocument();
  const urlFavorites = history.location.pathname;
  expect(urlFavorites).toBe('/favorites');

  history.push('/no-exist');
  const notFound = screen.getByRole('heading', { name: /Page requested not found/i });
  expect(notFound).toBeInTheDocument();
});
