import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
const NEXT = 'Próximo pokémon';

describe('Testa o componente <Pokedex />', () => {
  it('testa heading h2', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(title).toBeInTheDocument();
  });

  it('testa se outro pokemon é exibido ao clicar no botão Proximo Pokemon', async () => {
    renderWithRouter(<App />);
    const testId = 'pokemon-name';
    const nextButton = screen.getByRole('button', { name: NEXT });
    let currentPokemon = screen.getByTestId(testId);
    expect(currentPokemon).toHaveTextContent(/^Pikachu$/);
    userEvent.click(nextButton);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    currentPokemon = screen.getByTestId(testId);
    expect(currentPokemon).toHaveTextContent(/^Dragonair$/);
    userEvent.click(nextButton);
    currentPokemon = screen.getByTestId(testId);
    expect(currentPokemon).toHaveTextContent(/^Pikachu$/);
  });

  describe('Testa se a Pokedex tem os botoes de filtro', () => {
    it('testa se existe um botao para cada tipo de pokemon', () => {
      renderWithRouter(<App />);
      pokemonTypes.map((type) => expect(screen.getByRole('button', { name: type }))
        .toBeInTheDocument());
    });

    it('testa se ao selecionar o botao de filtro, a pokedex circula filtrados', () => {
      renderWithRouter(<App />);
      const testId = 'pokemon-type';
      const allButton = screen.getByRole('button', { name: 'All' });
      const fireButton = screen.getByRole('button', { name: 'Fire' });
      const nextButton = screen.getByRole('button', { name: NEXT });
      let currentPokemonType = screen.getByTestId(testId);
      expect(currentPokemonType).toHaveTextContent(/^Electric$/);
      userEvent.click(fireButton);
      userEvent.click(nextButton);
      currentPokemonType = screen.getByTestId(testId);
      expect(currentPokemonType).toHaveTextContent(/^Fire$/);
      expect(fireButton).toHaveTextContent(currentPokemonType.innerHTML);
      expect(allButton).toBeInTheDocument();
    });

    it('testa se possui um botao de reset para os filtros', () => {
      renderWithRouter(<App />);
      const testId = 'pokemon-type';
      const currentPokemonType = screen.getByTestId(testId);
      const allButton = screen.getByRole('button', { name: 'All' });
      const nextButton = screen.getByRole('button', { name: NEXT });
      userEvent.click(allButton);
      expect(currentPokemonType).toHaveTextContent(/^Electric$/);
      userEvent.click(nextButton);
      expect(currentPokemonType).toHaveTextContent(/^Fire$/);
      const fireButton = screen.getByRole('button', { name: 'Fire' });
      userEvent.click(fireButton);
      expect(currentPokemonType).toHaveTextContent(/^Fire$/);
    });
  });
});
