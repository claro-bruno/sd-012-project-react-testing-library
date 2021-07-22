import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Check if App is rendering as it should', () => {
  it('Renders a reading with the text `Pokédex`', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it(`Check if there is a menu with 3 links redirecting to
     "home", "about" and "favorite pokemons" respectively`, () => {
    renderWithRouter(<App />);
    const menu = screen.getAllByRole('link');
    expect(menu[0]).toHaveTextContent(/home/i);
    expect(menu[1]).toHaveTextContent(/about/i);
    expect(menu[2]).toHaveTextContent(/Favorite Pokémons/i);
  });
  it('Check if the "home" link is redirecting to path "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Check if the "about" link is redirecting to path "/about"', async () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText(/about/i);
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Check if the "Favorite Pokémons" link is redirecting to path "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Check if it is redirecting to page Not Found when the URL is unknown', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unexisting/page');
    const notFoundTitle = screen.getByText(/Page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });
});
