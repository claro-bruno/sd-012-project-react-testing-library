import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('requisito 1- Testa componente App', () => {
  it('App possui 3 Links fixos: Home, About, Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkList = screen.getAllByRole('link');
    expect(linkList[0].innerHTML).toBe('Home');
    expect(linkList[1].innerHTML).toBe('About');
    expect(linkList[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Link Home redireciona para o path / ', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByText('Home');

    userEvent.click(linkHome);

    const path = history.location.pathname;

    expect(path).toBe('/');
  });

  it('Link About redireciona para o path /about ', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText('About');

    userEvent.click(linkAbout);

    const path = history.location.pathname;

    expect(path).toBe('/about');
  });

  it('Link Favorite Pokémons redireciona para o path /favorites ', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByText('Favorite Pokémons');

    userEvent.click(linkFavorites);

    const path = history.location.pathname;

    expect(path).toBe('/favorites');
  });

  it('Redireciona para pagina not found quando path não existe', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/fofis');
    const noPathMsg = screen.getByText('Page requested not found');
    expect(noPathMsg).toBeInTheDocument();
  });
});
