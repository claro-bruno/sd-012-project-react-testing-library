import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste verificando se os links estão direcionando para o local correto.', () => {
  it('Verifica: navegação do link - HOME', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[0]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Verifica: navegação do link ABOUT', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[1]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('Verifica: navegação do link FAVORITE POKÉMONS', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[2]);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('Verifica: navegação para página NOT FOUND ao entrar com URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
    const noMatch = screen.getByText('Page requested not found');
    expect(noMatch).toBeInTheDocument();
  });
});

describe('Teste se o componente APP possui os links Home/About/Favorite Pokémon.', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Verifica se: o primeiro link encontrado em APP é: HOME', () => {
    const links = screen.getAllByRole('link');
    expect(links[0].innerHTML).toBe('Home');
  });
  it('Verifica se: o segundo link encontrado em APP é: ABOUT', () => {
    const links = screen.getAllByRole('link');
    expect(links[1].innerHTML).toBe('About');
  });
  it('Verifica se: o terceiro link encontrado em APP é: FAVORITE POKÉMONS', () => {
    const links = screen.getAllByRole('link');
    expect(links[2].innerHTML).toBe('Favorite Pokémons');
  });
});
