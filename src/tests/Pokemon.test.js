import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

import pokemons from '../data';

const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const weightTestId = 'pokemon-weight';
const firstPokemon = pokemons[0];

describe('[ 6 ] Testa o componente Pokemon.js', () => {
  describe('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      test('O nome correto do Pokémon deve ser mostrado na tela', () => {
        renderWithRouter(<App />);
        const pokemonName = screen.getByTestId(nameTestId);
        expect(pokemonName).toHaveTextContent(firstPokemon.name);
      });
      test('O tipo correto do pokémon deve ser mostrado na tela', () => {
        renderWithRouter(<App />);
        const pokemonType = screen.getByTestId(typeTestId);
        expect(pokemonType).toHaveTextContent(firstPokemon.type);
      });
      test('O peso médio do pokémon deve ser exibido com um texto no formato correto',
        () => {
          renderWithRouter(<App />);
          const pokemonWeight = screen.getByTestId(weightTestId);
          expect(pokemonWeight).toHaveTextContent(/Average weight:/i);
          const { value, measurementUnit } = firstPokemon.averageWeight;
          expect(pokemonWeight).toHaveTextContent(value);
          expect(pokemonWeight).toHaveTextContent(measurementUnit);
        });
      test('A imagem do Pokémon deve ser exibida', () => {
        renderWithRouter(<App />);
        const pokemonImage = screen.getByRole('img', { src: firstPokemon.image });
        expect(pokemonImage).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute('alt', `${firstPokemon.name} sprite`);
      });
    });
  describe('Testa se o card do Pokémon contém link de navegação para os detalhes deste',
    () => {
      test('O link deve possuir a URL /pokemons/<id>', () => {
        renderWithRouter(<App />);
        const moreDetails = screen.getByRole('link', { name: /more details/i });
        expect(moreDetails).toHaveAttribute('href', `/pokemons/${firstPokemon.id}`);
      });
    });
  describe('Testa se ao clicar em Mais detalhes, há redirect para os detalhes do Pokemon',
    () => {
      test('Testa se ao clicar em Mais detalhes, há redirect para os detalhes do Pokemon',
        () => {
          const { history } = renderWithRouter(<App />);
          const moreDetails = screen.getByRole('link', { name: /more details/i });
          fireEvent.click(moreDetails);
          const { name, id } = firstPokemon;
          const h2 = screen.getByRole('heading', { name: `${name} Details` });
          expect(h2).toBeInTheDocument();
          expect(history.location.pathname).toEqual(`/pokemons/${id}`);
        });
    });
  describe('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    test('A img tem alt="<pokemon> is marked as favorite"', () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      fireEvent.click(moreDetails);
      const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
      fireEvent.click(favorite);
      const starIcon = screen.getByAltText(`${firstPokemon.name} is marked as favorite`);
      expect(starIcon).toBeInTheDocument();
    });
    test('A img tem src = "/star-icon.svg"', () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /more details/i });
      fireEvent.click(moreDetails);
      const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
      fireEvent.click(favorite);
      fireEvent.click(favorite);
      const images = screen.getAllByRole('img');
      expect(images[1]).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
