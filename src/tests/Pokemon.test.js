import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const { screen } = require('@testing-library/react');

const pokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: `This intelligent Pokémon roasts hard berries with 
  electricity to make them tender enough to eat.`,
  },
];

describe('Component Pokemon tests', () => {
  beforeEach(() => renderWithRouter(<App pokemon={ pokemon } />));

  it('Tests if pokemon infos are rendered', () => {
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img');
    const pokeImgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeigth.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImage).toHaveAttribute('src', pokeImgSrc);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Tests if card has link to show Pokemons details', () => {
    const detailsLink = screen.getByRole('link', { name: /More Details/i });
    expect(detailsLink.href).toContain('/pokemons/25');
    userEvent.click(detailsLink);
  });

  it('Tests if URl chande to specific ID', () => {
    const details = screen.getByRole('link', {
      name: /More Details/i,
    });
    expect(`${details}25`).toContain('/pokemons/25');
    userEvent.click(details);
  });
  it('Tests if exists favorite star icon', () => {
    const details = screen.getByRole('link', {
      name: /More Details/i,
    });
    userEvent.click(details);
    expect(details.href).toContain('/pokemons/');
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const starImage = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
      src: '/star-icon.svg',
    });
    expect(starImage.src).toContain('/star-icon.svg');
    const pokeImage = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(pokeImage).toBeInTheDocument();
  });
});
