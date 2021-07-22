import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import Alakazam from '../__mocks__/data';
import App from '../App';

jest.mock('../data');

const { name, id } = Alakazam[0];

describe('Testa componente PokemonDetails', () => {
  describe(`Verifica se as informações detalhadas do Pokémon
    selecionado são mostradas na tela.`, () => {
    it(`A página deve conter um texto <name> Details, onde <name> é
    o nome do Pokémon;`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getByRole('heading', {
        name: `${name} Details`,
        level: 2,
      })).toBeInTheDocument();
    });
  });
});
