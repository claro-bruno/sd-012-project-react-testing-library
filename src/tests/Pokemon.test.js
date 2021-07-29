import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do <Pokemon />', () => {
  test('Teste se é renderizado card com informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  test('Testa se vai para os detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const psyButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psyButton);

    const name = screen.getByText(/Alakazam/i);
    expect(name).toBeInTheDocument();

    const linkMoreDetails = screen.getByText(/more details/i);
    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/65');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const psyButton = screen.getByRole('button', { name: /Psychic/i });
    userEvent.click(psyButton);

    const linkMoreDetails = screen.getByText(/more details/i);
    userEvent.click(linkMoreDetails);

    const checkButton = screen.getByRole('checkbox');
    userEvent.click(checkButton);

    const imgText = screen.getByAltText('Alakazam is marked as favorite');
    const url = 'http://localhost/star-icon.svg';
    expect(imgText).toBeInTheDocument();
    expect(imgText.src).toBe(url);
  });
});
