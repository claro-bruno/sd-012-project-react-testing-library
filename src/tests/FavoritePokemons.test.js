import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando os Favoritos', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { history } = renderWithRouter(<App />);
    const getFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(getFav).toBeInTheDocument();

    userEvent.click(getFav);
    const url = history.location.pathname;
    const noFound = screen.getByText('No favorite pokemon found');
    expect(url).toBe('/favorites');
    expect(noFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const getDetails = screen.getByRole('link', { name: 'More details' });
    expect(getDetails).toBeInTheDocument();

    userEvent.click(getDetails);
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();

    userEvent.click(label);
    const getFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(getFav).toBeInTheDocument();

    userEvent.click(getFav);
    const url = history.location.pathname;
    const searchPikachu = screen.getByText('Pikachu');
    expect(url).toBe('/favorites');
    expect(searchPikachu).toBeInTheDocument();
  });
});
