import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import render from './renderWithRouter';

describe('Verifica topo da aplicação contém um conjunto de links de navegação.', () => {
  beforeEach(() => render(<App />));
  it('O Primeiro link possui o texto "Home"', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
  });
  it('O segundo link possui o texto "About".', () => {
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
  });
  it('O terceiro link possui o texto "Favorite Pokémons".', () => {
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});

describe('Verifica redirecionamento do conjunto de links no topo da página.', () => {
  it('Ao clicar no botão "Home", a página é redirecionada para tela inicial.', () => {
    const { history } = render(<App />);
    const btnHome = screen.getByText('Home');
    fireEvent.click(btnHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Ao clicar no botão "About", a página é redirecionada para tela About.', () => {
    const { history } = render(<App />);
    const btnHome = screen.getByText('About');
    fireEvent.click(btnHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('Ao clicar no botão "Favorite Pokémons", a página é redirecionada a mesma.', () => {
    const { history } = render(<App />);
    const btnHome = screen.getByText('Favorite Pokémons');
    fireEvent.click(btnHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
