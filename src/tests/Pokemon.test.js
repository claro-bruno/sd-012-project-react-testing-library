import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica Pokemon.test.js', () => {
  test('Verifica (name, type, weight, image) do Pokemon', () => {
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
  test('Verifica link do pokemon (details, rota)', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeDefined();

    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Verifica pagina de detalhes do Pokemon se favorito (favorite, details)', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);

    const pkxDetail = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(pkxDetail).toBeDefined();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));
    userEvent.click(screen.getByRole('link', { name: /Home/i }));

    const imgStar = screen.getAllByRole('img');
    expect(imgStar[1].src).toBe('http://localhost/star-icon.svg');
    expect(imgStar[1].alt).toBe('Pikachu is marked as favorite');
  });
});
