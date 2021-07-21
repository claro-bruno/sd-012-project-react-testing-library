import React from 'react';
import renderWithRouter from './renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('requisito 1- Testa componente App', () => {

  it('App possui 3 Links fixos: Home, About, Favorite Pokémons', () => {
    const { getAllByRole } = renderWithRouter(<App />);
    const linkList = getAllByRole('link');
    expect(linkList[0].innerHTML).toBe('Home');
    expect(linkList[1].innerHTML).toBe('About');
    expect(linkList[2].innerHTML).toBe('Favorite Pokémons');
  });

  it('Testa se Link Home redireciona para o path / ', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const linkHome = getByText('Home');

    userEvent.click(linkHome);

    const path = history.location.pathname;

    expect(path).toBe('/');
  });
})
