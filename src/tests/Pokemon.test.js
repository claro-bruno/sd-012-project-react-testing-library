import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica Pokemon.test.js', () => {
  test('Verificar name, type, weight, image do Pokemon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.textContent).toBe('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.textContent).toBe('Electric');

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');

    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Verificar link do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeDefined();

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Verificar paga de detalhes do Pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const pkxDetail = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pkxDetail).toBeDefined();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
