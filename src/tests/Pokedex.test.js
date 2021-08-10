import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const btnName = 'Próximo pokémon';
  const pokemonName = 'pokemon-name';
  const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  const typeButtonTestId = 'pokemon-type-button';

  it('Testa se a página renderiza um h2 com o texto', () => {
    const headingPokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });
    expect(headingPokedex).toBeInTheDocument();
  });

  it('Testa se o botão para ir para o próximo pokemon contém o texto', () => {
    const nextPokemonBtn = screen.getByRole('button', { name: btnName });
    expect(nextPokemonBtn).toBeInTheDocument();
  });

  // Testa se ao clicar no botão ele exibe o próximo pokemon da lista e se o próximo for o último, ao clicar novamente ele retorna para o primeiro.
  it('Testa função do botão de próximo pokemon', () => {
    const firstPokemon = screen.getByTestId(pokemonName);
    const nextPokemonBtn = screen.getByRole('button', { name: btnName });
    pokemons.forEach((_pokemon, index) => {
      if (index < pokemons.length - 1) {
        fireEvent.click(nextPokemonBtn);
        const thisPokemon = screen.getByTestId(pokemonName);
        expect(thisPokemon).toHaveTextContent(pokemons[index + 1].name);
      } else {
        fireEvent.click(nextPokemonBtn);
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      }
    });
  });

  it('Testa se é mostrado somente um pokémon por vez', () => {
    const pokemonOnScreen = screen.getAllByTestId(pokemonName);
    expect(pokemonOnScreen).toHaveLength(1);
  });

  it('Testa se a pokédex tem os botões de filtro', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    expect(buttonsOnScreen).toHaveLength(types.length);
  });

  it('Testa se existe um botão de filtragem para cada tipo', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    buttonsOnScreen.forEach(
      (button, index) => expect(button.textContent).toBe(types[index]),
    );
    expect(buttonsOnScreen).toHaveLength(types.length);
  });

  it('Testa se, selecionando um tipo, somente pokemons desse tipo são exibidos', () => {
    const electricButtonType = screen.getByRole('button', { name: 'Electric' });
    fireEvent.click(electricButtonType);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('Testa se o texto do botão corresponde ao texto do tipo', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    buttonsOnScreen.forEach(
      (button, index) => expect(button.textContent).toBe(types[index]),
    );
  });

  it('Testa se o botão All está sempre visível', () => {
    const buttonsOnScreen = screen.getAllByTestId(typeButtonTestId);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    buttonsOnScreen.forEach((button) => {
      fireEvent.click(button);
      expect(buttonAll).toBeInTheDocument();
    });
  });
});
