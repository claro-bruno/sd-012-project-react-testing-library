import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa os elementos home e not found', () => {
  it('Testa links home', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
    userEvent.click(links[0]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Testa o link not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/notfound');
  });
});
describe('Elementos do about', () => {
  it('Testa links about', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
    userEvent.click(links[1]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
});

describe('Elementos do favorites', () => {
  it('Testa links favorite pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
    userEvent.click(links[2]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
