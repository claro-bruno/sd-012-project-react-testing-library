import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../etc/renderWithRouter';

describe('App,js', () => {
  it('Home', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('About', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const favoritos = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favoritos);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/test');
    const notFound = screen.getByRole('heading', { name: /age requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
