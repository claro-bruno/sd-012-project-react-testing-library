import React from 'react';
import { screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import render from './renderWithRouter';

describe('Verifica os elementos do card do Pokemon.', () => {
  const pokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  };
  it('A página contém o card com as informações de determinado pokémon', () => {
    render(<Pokemon pokemon={ pokemon } isFavorite />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');
    expect(name.textContent).toBe('Pikachu');
    expect(type.textContent).toBe('Electric');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('O card contém o link para detalhes.', () => {
    const { history } = render(<Pokemon pokemon={ pokemon } isFavorite />);
    const detail = screen.getByText('More details');
    userEvent.click(detail);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('O card contém icone de favorito.', () => {
    render(<Pokemon pokemon={ pokemon } isFavorite />);
    const star = screen.getByAltText('Pikachu is marked as favorite');
    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
