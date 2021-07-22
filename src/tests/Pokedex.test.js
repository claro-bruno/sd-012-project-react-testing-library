import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('Testa Pokedex', () => {
  const { history } = renderWithRouter(<App />);
  const SEVEN = 7;
  const testIDPOkemonType = 'pokemon-type';

  const pathHome = history.location.pathname;
  expect(pathHome).toBe('/');

  const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
  expect(title).toBeInTheDocument();

  const FirstPokemon = screen.getByText(/Pikachu/i);
  const FirstPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstPokemon).toBeInTheDocument();
  expect(FirstPokemonType.innerHTML).toBe('Electric');

  const nextPokemonButton = screen.getByTestId('next-pokemon');
  expect(nextPokemonButton.innerHTML).toBe('Próximo pokémon');
  userEvent.click(nextPokemonButton);

  const SecondPokemon = screen.getByText(/Charmander/i);
  const SecondPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(SecondPokemon).toBeInTheDocument();
  expect(SecondPokemonType.innerHTML).toBe('Fire');

  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterButtons.length).toBe(SEVEN);
  expect(filterButtons[0].innerHTML).toBe('Electric');

  userEvent.click(filterButtons[0]);
  const FirstEletricPokemon = screen.getByText(/Pikachu/i);
  expect(FirstEletricPokemon).toBeInTheDocument();
  const FirstEletricPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstEletricPokemonType.innerHTML).toBe('Electric');

  userEvent.click(filterButtons[1]);
  const FirstFirePokemon = screen.getByText(/Charmander/i);
  expect(FirstFirePokemon).toBeInTheDocument();
  const FirstFirePokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstFirePokemonType.innerHTML).toBe('Fire');

  userEvent.click(filterButtons[2]);
  const FirstBugPokemon = screen.getByText(/Caterpie/i);
  expect(FirstBugPokemon).toBeInTheDocument();
  const FirstBugPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstBugPokemonType.innerHTML).toBe('Bug');

  userEvent.click(filterButtons[3]);
  const FirstPoisonPokemon = screen.getByText(/Ekans/i);
  expect(FirstPoisonPokemon).toBeInTheDocument();
  const FirstPosionPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstPosionPokemonType.innerHTML).toBe('Poison');

  userEvent.click(filterButtons[4]);
  const FirstPsychicPokemon = screen.getByText(/Alakazam/i);
  expect(FirstPsychicPokemon).toBeInTheDocument();
  const FirstPsychicPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstPsychicPokemonType.innerHTML).toBe('Psychic');

  userEvent.click(filterButtons[5]);
  const FirstNormalPokemon = screen.getByText(/Snorlax/i);
  expect(FirstNormalPokemon).toBeInTheDocument();
  const FirstNormalPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstNormalPokemonType.innerHTML).toBe('Normal');

  userEvent.click(filterButtons[6]);
  const FirstDragonPokemon = screen.getByText(/Dragonair/i);
  expect(FirstDragonPokemon).toBeInTheDocument();
  const FirstDragonPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstDragonPokemonType.innerHTML).toBe('Dragon');

  const allButton = screen.getByRole('button', { name: /All/i });
  userEvent.click(allButton);
  const FirstAllPokemon = screen.getByText(/Pikachu/i);
  expect(FirstAllPokemon).toBeInTheDocument();
  const FirstAllPokemonType = screen.getByTestId(testIDPOkemonType);
  expect(FirstAllPokemonType.innerHTML).toBe('Electric');
});
