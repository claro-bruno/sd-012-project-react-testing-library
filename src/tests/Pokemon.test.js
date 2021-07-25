import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente <Pokemon />', () => {
  test('Test se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute('src', expect.stringMatching('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png'));
  });

  test('Testa si ao clikar no link leva para uma pagina detalhada.', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const linkDetails = screen.getByText(/more details/i);

    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se ao selecionar um pokemon como favorito ele recebe um icon star', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } />);

    const link = screen.getByRole('link');
    userEvent.click(link);

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });
});
