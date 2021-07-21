import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { getByTestId, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';

const pokemons = [
  {
    id: 151,
    name: 'Mew',
    type: 'Psychic',
    averageWeight: {
      value: '4.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Mew_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Faraway Island',
        map: 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png',
      },
    ],
    summary: 'Apparently, it appears only to those people who are pure of heart and have'
    + ' a strong desire to see it.',
  },
  {
    id: 78,
    name: 'Rapidash',
    type: 'Fire',
    averageWeight: {
      value: '95.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Rapidash_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Route 28',
        map: 'https://cdn2.bulbagarden.net/upload/5/5b/Kanto_Route_28_Map.png',
      },
      {
        location: 'Johto Mount Silver',
        map: 'https://cdn2.bulbagarden.net/upload/9/95/Johto_Mt_Silver_Map.png',
      },
    ],
    summary: 'At full gallop, its four hooves barely touch the ground because it'
    + ' moves so incredibly fast.',
  },
  {
    id: 143,
    name: 'Snorlax',
    type: 'Normal',
    averageWeight: {
      value: '460.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Snorlax_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Vermillion City',
        map: 'https://cdn2.bulbagarden.net/upload/5/54/Kanto_Vermilion_City_Map.png',
      },
    ],
    summary: 'What sounds like its cry may actually be its snores or the rumblings '
    + 'of its hungry belly.',
  },
  {
    id: 148,
    name: 'Dragonair',
    type: 'Dragon',
    averageWeight: {
      value: '16.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Johto Route 45',
        map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
      },
      {
        location: 'Johto Dragon\'s Den',
        map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
      },
    ],
    summary: 'They say that if it emits an aura from its whole body, the weather'
    + ' will begin to change instantly.',
  },
];
const favPokemons = { 151: true, 78: false, 143: false, 148: false };
const pkmName = 'pokemon-name';

describe('Atendendo aos testes do Requisito 5', () => {
  test('Testando os requisitos de renderização de pokemon sem filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favPokemons }
    />);
    const pokedexHeading = screen.getByRole('heading', { level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
    expect(pokedexHeading.textContent).toBe('Encountered pokémons');

    const nextPkm = screen.getByTestId('next-pokemon');
    expect(nextPkm).toBeInTheDocument();
    expect(nextPkm.textContent).toBe('Próximo pokémon');
    pokemons.forEach((pkm) => {
      expect(screen.getByTestId(pkmName).textContent).toBe(pkm.name);
      expect(screen.getAllByTestId(pkmName).length).toBe(1);
      userEvent.click(nextPkm);
    });
    expect(screen.getByTestId(pkmName).textContent).toBe('Mew');
    expect(screen.getAllByTestId(pkmName).length).toBe(1);
  });

  test('Testando os requisitos de renderização de pokemon com filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favPokemons }
    />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(screen.getByTestId(pkmName).textContent).not.toBe('');

    const pkmTypes = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];

    const typeBtns = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtns.length).toBe(pkmTypes.length);
    typeBtns.forEach((btn, i) => {
      expect(btn.textContent).toBe(pkmTypes[i]);
      expect(allBtn).toBeInTheDocument();
      expect(screen.getByTestId(pkmName).textContent).not.toBe('');
      userEvent.click(btn);
    });
  });

  test('Testando os ação do botão Type All filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ favPokemons }
    />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(screen.getByTestId(pkmName).textContent).not.toBe('');
  });
});
