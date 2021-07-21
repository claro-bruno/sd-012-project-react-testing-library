import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('app component', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('"home" deve ser o primeiro link', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
  });
  it('"About" deve ser o segundo link', () => {
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
  });
  it('"Favorite Pokémons" deve ser o terceiro link', () => {
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});

describe('testa navegação entre os links', () => {
  it('navegação da Home', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('navegação do About', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('navegação dos Favoritos', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
