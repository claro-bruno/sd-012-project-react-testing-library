import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import data from '../data';

describe('Testa o componente Pokemon', () => {
  const path = '/pokemons/25';
  afterEach(() => jest.clearAllMocks());
  const pikachu = data[0];

  it(`Teste se é renderizado um card
  com as informações de determinado pokémon`, () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    expect(screen.getByText('Pikachu'));
    expect(screen.getByText('Electric'));
    expect(screen.getByText('Average weight: 6.0 kg'));
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex contém um
  link de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite showDetailsLink />);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link.pathname).toBe(path);
  });

  it(`Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da
  aplicação para a página de detalhes de Pokémon`, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    userEvent.click(screen.getByText(/more details/i));
    const { pathname } = history.location;
    expect(pathname).toBe(path);
  });

  it(`Teste se existe um ícone de
  estrela nos Pokémons favoritados`, () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);
    const img = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
