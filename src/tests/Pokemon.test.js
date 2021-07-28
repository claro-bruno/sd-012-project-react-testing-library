import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Verifica o componente "Pokemon.js"', () => {
  test('Verifica se o card com informações de um pokemon especifico é correto', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name', { name: /Pikachu/i });
    expect(pokemon).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const img = screen.getByAltText('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Verifica o link de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(detailsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');

    const selectFavoritePokemon = screen.getByRole('checkbox', { checked: false });
    userEvent.click(selectFavoritePokemon);

    const selectStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(selectStar.src).toBe('http://localhost/star-icon.svg');
  });
});
