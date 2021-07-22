import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import data from '../data';

describe('Tentando o Componente <Pokemon />', () => {
  let history = {};

  beforeEach(() => {
    history = renderWithRouter(<Pokemon
      pokemon={ data[0] }
      isFavorite="true"
    />).history;
  });

  it(('Testando se o card é renderizado corretamente'), () => {
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const detailsButton = screen.getByText('More details');
    const pokePic = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(detailsButton).toBeInTheDocument();
    expect(detailsButton).toHaveTextContent('More details');
    expect(pokePic).toBeInTheDocument();
    expect(pokePic).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(('Testando funcionalidade do botão more details'), () => {
    const detailsButton = screen.getByRole('link');
    expect(detailsButton.pathname).toBe('/pokemons/25');
    userEvent.click(detailsButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it(('Teste se existe um ícone de estrela nos Pokémons favoritados'), () => {
    const pokeStar = screen.getByRole('img', { name: /favorite/i });
    expect(pokeStar).toHaveAttribute('src', '/star-icon.svg');
    expect(pokeStar).toHaveProperty('alt', 'Pikachu is marked as favorite');
  });
});
