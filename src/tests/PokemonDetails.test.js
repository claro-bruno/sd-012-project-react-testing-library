import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import Alakazam from '../__mocks__/data';
import App from '../App';

jest.mock('../data');

const { name, id, foundAt: [obj] } = Alakazam[0];
const { location, map } = obj;
const summary = 'Closing both its eyes heightens all its other senses.';

describe('Testa componente PokemonDetails', () => {
  describe(`Verifica se as informações detalhadas do Pokémon
    selecionado são mostradas na tela.`, () => {
    it('Texto <name> Details, onde <name> é o nome do Pokémon;', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getByRole('heading', {
        name: `${name} Details`,
        level: 2,
      })).toBeInTheDocument();
    });

    it('Não deve existir o link de navegação "More details"', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.queryByRole('link', {
        name: /More details/i,
      })).toBeNull();
    });

    it('Heading h2 com o texto Summary.', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getByRole('heading', {
        name: /Summary/,
        level: 2,
      })).toBeInTheDocument();
    });

    it('Parágrafo com o resumo do Pokémon', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getByText(summary)).toBeInTheDocument();
    });
  });

  describe('Verifica seção com os mapas contendo as localizações do pokémon', () => {
    it('Heading h2 com o texto Game Locations of <name>', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getByRole('heading', {
        name: `Game Locations of ${name}`,
        level: 2,
      })).toBeInTheDocument();
    });

    it('localizações do Pokémon devem ser mostradas na seção de detalhes', () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      expect(screen.getByRole('img', { name: `${name} location` }))
        .toHaveAttribute('src', map);
      expect(screen.getByText(location)).toBeInTheDocument();
    });
  });

  describe('Verifica se o usuário pode favoritar um pokémon', () => {
    it(`O label do checkbox deve conter o texto "Pokémon favoritado?"
      e usuário deve poder marcar e desmarcar pokémon`, () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      expect(screen.queryByRole('img', {
        name: `${name} is marked as favorite`,
      })).toBeInTheDocument();
      userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
      expect(screen.queryByRole('img', {
        name: `${name} is marked as favorite`,
      })).toBeNull();
    });
  });
});
