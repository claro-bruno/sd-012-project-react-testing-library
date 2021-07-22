import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testes do arquvio Pokemon.js', () => {
  test('Verifica se um card e criado', () => {
    const { history } = renderWithRouter(<App />);
    screen.getByTestId('pokemon-name');
    screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight:');
    const image = screen.getByRole('img');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imgAlt = 'Pikachu sprite';
    expect(image).toHaveAttribute('src', imgSrc);
    expect(image).toHaveAttribute('alt', imgAlt);
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const icon = screen.getAllByRole('img');
    const iconSrc = '/star-icon.svg';
    const iconAlt = 'Pikachu is marked as favorite';
    expect(icon[1]).toHaveAttribute('src', iconSrc);
    expect(icon[1]).toHaveAttribute('alt', iconAlt);
  });
});
