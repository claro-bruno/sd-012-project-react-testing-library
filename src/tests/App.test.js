import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { BrowserRouter, Router } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  test('First link must have the text of Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    // userEvent.click(homeLink);

    // // pegar url
    const { pathname } = history.location;

    // // verificar se url 'e /projects
    expect(pathname).toBe('/');
  });

  test('If second link has the text of About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    // // pegar url
    const { pathname } = history.location;

    // // verificar se url 'e /projects
    expect(pathname).toBe('/about');
  });

  test('If third link redirects to the favorites page', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;

    expect(pathname).toBe('/favorites');
  });

  test('If it renders the Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText(/😭/i);
    expect(noMatch).toBeInTheDocument();
  });
});
