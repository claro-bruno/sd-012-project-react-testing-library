import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando a aplicao App.js', () => {
  it('Testando se o primeiro link possui o texto "home" e seu click', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const path = pathname;
    const home = screen.getByText('Home');
    expect(path).toBe('/');
    expect(home).toBeInTheDocument();
  });
  it('Testando se o segundo link possui texto "about" e seu click', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByText('About');
    userEvent.click(about);
    const pathabout = history.location.pathname;
    expect(pathabout).toBe('/about');
    expect(about).toBeInTheDocument();
  });
  it('Testando se o terceiro link possui texto "Favorite Pokémons" e seu click', () => {
    const { history } = renderWithRouter(<App />);
    const favorite = screen.getByText('Favorite Pokémons');
    userEvent.click(favorite);
    const pathFav = history.location.pathname;
    expect(pathFav).toBe('/favorites');
    expect(favorite).toBeInTheDocument();
  });
  it('Testando Pagina NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/digimons');
    const
      nt = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(nt).toBeInTheDocument();
  });
});
