import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import historyRender from './GenericHistory';

describe('Testes do App.js', () => {
  it('Texta link de navegação "Home"', () => {
    const { history } = historyRender(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeDefined();

    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Texta link de navegação "About"', () => {
    const { history } = historyRender(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeDefined();

    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Texta link de navegação "Favorite Pokemons"', () => {
    const { history } = historyRender(<App />);
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeDefined();

    userEvent.click(favorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Testa página "Not Found"', () => {
    const { history } = historyRender(<App />);
    history.push('/notFound');
    const notfound = screen.queryByText(/not found/i);

    expect(notfound).toBeInTheDocument();
  });
});
