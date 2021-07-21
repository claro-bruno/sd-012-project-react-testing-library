import React from 'react';
import App from '../App';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';

describe("Tests for component App.js", () => {
  it("Test if App has nav links.", () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole(/link/i, { name: /home/i });
    const aboutLink = screen.getByRole(/link/i, { name: /about/i });
    const favoriteLink = screen.getByRole(/link/i, { name: /favorite pokémons/i });

    expect(homeLink).toBeDefined();
    expect(aboutLink).toBeDefined();
    expect(favoriteLink).toBeDefined();
  });

  it("Test home nav link.", () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole(/link/i, { name: /home/i });

    userEvent.click(homeLink);
    
    const { pathname } = history.location;
    expect(pathname).toBe("/");
  });

  it("Test about nav link.", () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole(/link/i, { name: /about/i });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe("/about");
  });

  it("Test favorite pokémons nav link.", () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole(/link/i, { name: /favorite pokémons/i });

    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe("/favorites");
  });

  it("Test if goes to Not Found Page.", () => {
    const { history } = renderWithRouter(<App />);
    history.push("notfound-page")

    const notFoundText = screen.getByText(/page requested not found/i);
    expect(notFoundText).toBeDefined();
  });
});
