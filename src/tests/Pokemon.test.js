import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 6 - Testa o componenete <Pokemon />', () => {
  /* beforeEach(() => {
    renderWithRouter(<App />);
  }); */

  it('Testa se é renderizado um card com as informações de um pokémon', () => {
    renderWithRouter(<App />);
    const takeName = screen.getByTestId('pokemon-name');
    const takeType = screen.getByTestId('pokemon-type');
    const takeWeight = screen.getByTestId('pokemon-weight');

    expect(takeName.textContent).toBe('Pikachu');
    expect(takeType.textContent).toBe('Electric');
    expect(takeWeight.textContent).toBe('Average weight: 6.0 kg');
  });

  it('Testa o atributo alt e src', () => {
    renderWithRouter(<App />);
    const takeFirstImg = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(takeFirstImg.alt).toBe(`${pokemons[0].name} sprite`);
    expect(takeFirstImg.src).toBe(src);
  });

  it('Testa se há um link para <PokemonDetails />', () => {
    renderWithRouter(<App />);
    const takeLink = screen.getByText('More details');

    expect(takeLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Testa o link para <PokemonDetails />', () => {
    const { history } = renderWithRouter(<App />);
    const takeLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(takeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const takeLinkDetails = screen.getByText(/More details/i);
    userEvent.click(takeLinkDetails);

    const takeCheck = screen.getByRole('checkbox');
    userEvent.click(takeCheck);

    const takeFavorite = screen.getByAltText('Pikachu is marked as favorite');
    const src = 'http://localhost/star-icon.svg';
    expect(takeFavorite).toHaveProperty('src', src);
  });
});
