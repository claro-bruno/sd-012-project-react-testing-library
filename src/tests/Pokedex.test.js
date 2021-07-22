import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';
import data from '../data';
import pokeTypes from '../helper/pokeTypes';

const testIdName = 'pokemon-name';
const testIdType = 'pokemon-type';

describe('Testa componente Pokedex', () => {
  describe('Verifica o heading da pagina', () => {
    it(`Verifica se a pagina contém um heading h2 com o texto:
        Encountered pokémons.`, () => {
      renderWithRouter(<App />);

      expect(screen.getByRole('heading', {
        name: /Encountered pokémons/i,
        level: 2 })).toBeInTheDocument();
    });
  });

  describe('Verifica funcionamento do botão "Próximo pokémon"', () => {
    it('Verifica se existe um botão "Próximo pokémon"', () => {
      renderWithRouter(<App />);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/ });

      expect(nextButton).toBeInTheDocument();
    });

    it(`Verifica se é exibido o próximo Pokémon da lista quando o botão
        "Próximo pokémon" é clicado.`, () => {
      renderWithRouter(<App />);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/ });
      const pokemon1 = screen.getByTestId(testIdName).innerHTML;

      userEvent.click(nextButton);

      const pokemon2 = screen.getByTestId(testIdName).innerHTML;
      expect(pokemon1).not.toEqual(pokemon2);
    });

    it(`Verifica se o primeiro Pokémon da lista é mostrado ao clicar no botão,
        se estiver no último Pokémon da lista`, () => {
      renderWithRouter(<App />);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/ });
      const pokemon1 = screen.getByTestId(testIdName).innerHTML;

      for (let index = 1; index < data.length; index += 1) {
        userEvent.click(nextButton);
      }

      const pokemon2 = screen.getByTestId(testIdName).innerHTML;
      expect(pokemon1).not.toEqual(pokemon2);

      userEvent.click(nextButton);

      const pokemon3 = screen.getByTestId(testIdName).innerHTML;
      expect(pokemon1).toEqual(pokemon3);
    });
  });

  describe('Verifica Filtros', () => {
    it(`Verifica se a Pokédex tem os botões de filtragem por tipos, sem
        repetição.`, () => {
      renderWithRouter(<App />);

      const filterTypesBtn = screen.getAllByTestId('pokemon-type-button');

      expect(filterTypesBtn.length).toBe(pokeTypes.length);

      pokeTypes.forEach((type) => {
        expect(screen.getByRole('button', { name: type })).toBeInTheDocument();
      });
    });

    it(`Verifica se o texto do botão clicado corresponde ao nome do tipo
        e se o botão "All" permanece visível`, () => {
      renderWithRouter(<App />);

      pokeTypes.forEach((type) => {
        userEvent.click(screen.getByRole('button', { name: type }));

        expect(screen.getByTestId(testIdType)).toHaveTextContent(type);
        expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
      });
    });

    it('Verifica se o botão "All" reseta o filtro', () => {
      renderWithRouter(<App />);

      const allBtn = screen.getByRole('button', { name: 'All' });
      const psychBtn = screen.getByRole('button', { name: 'Psychic' });
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/ });

      expect(allBtn).toBeInTheDocument();
      expect(psychBtn).toBeInTheDocument();

      userEvent.click(psychBtn);
      expect(screen.getByTestId(testIdType)).toHaveTextContent('Psychic');

      userEvent.click(allBtn);
      expect(screen.getByTestId(testIdName)).toHaveTextContent('Pikachu');

      for (let index = 1; index < data.length; index += 1) {
        userEvent.click(nextButton);
      }

      expect(screen.getByTestId(testIdName)).toHaveTextContent('Dragonair');
    });
  });
});
