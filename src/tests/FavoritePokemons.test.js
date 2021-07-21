import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Atendendo aos testes do Requisito 3', () => {

  test('Testando se renderiza texto sem nenhum Pokemon', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPKM = screen.getByText('No favorite pokemon found');
    expect(noPKM).toBeInTheDocument();
  });

  test('Testando se renderiza Pokemons', () => {
    const favPokemon = [
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
        summary: 'Apparently, it appears only to those people who are pure of heart and '
        + 'have a strong desire to see it.',
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
        summary: 'At full gallop, its four hooves barely touch the ground because it moves '
        + 'so incredibly fast.',
      },
    ];
    renderWithRouter(<FavoritePokemons pokemons={ favPokemon } />);
    const pkms = screen.getAllByTestId('pokemon-name');
    expect(pkms[0]).toBeInTheDocument();
    expect(pkms[0].textContent).toBe('Mew');
    expect(pkms[1]).toBeInTheDocument();
    expect(pkms[1].textContent).toBe('Rapidash');
    expect(pkms.length).toBe(2);
  });
});
