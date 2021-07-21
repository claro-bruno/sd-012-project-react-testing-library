import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa todo o App.js', () => {
  it('renderiza "Pokédex"', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: /Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  it('renderiza o conjunto de link', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const navLinks = screen.getAllByRole('link');

    const linksLength = 4;
    expect(navLinks.length).toBe(linksLength);

    const homeLink = navLinks[0];
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent(/Home/i);

    const aboutLink = navLinks[1];
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveTextContent(/About/i);

    const favoritesLink = navLinks[2];
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveTextContent(/Favorite Pokémons/i);
  });

  it('clicando no link "Home"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByText(/Home/i);
    userEvent.click(homeLink);

    expect(history.location.pathname).toBe('/');
  });

  it('clicando no link "About"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByText(/About/i);
    userEvent.click(aboutLink);

    expect(history.location.pathname).toBe('/about');
  });
});
