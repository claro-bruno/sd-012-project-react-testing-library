import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonNames = pokemons.map(({ name }) => name);
const pokemonTypes = Array.from(new Set(pokemons.map(({ type }) => type)));
const NAME_TESTID = 'pokemon-name';

describe('Testando se o Pokedex.js', () => {
  it('contém um h2 com o texto esperado', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();

    const subtitle = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(subtitle).toBeInTheDocument();
  });

  it('exibe o próximo pokemon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent(pokemonNames[0]);
    userEvent.click(nextButton);
    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent(pokemonNames[1]);
    userEvent.click(nextButton);
    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent(pokemonNames[2]);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent(pokemonNames[0]);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('mostra apenas um pokemon por vez', () => {
    renderWithRouter(<App />);

    expect(screen.getAllByTestId(NAME_TESTID)).toHaveLength(1);

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    userEvent.click(nextButton);

    expect(screen.getAllByTestId(NAME_TESTID)).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('contém os botões de fitlros', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons).toHaveLength(pokemonTypes.length);
    expect(typeButtons[0]).toHaveTextContent(pokemonTypes[0]);
    expect(typeButtons[4]).toHaveTextContent(pokemonTypes[4]);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

  it('filtra os pokemons exibidos por tipo', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(typeButtons[0]);

    expect(screen.getByTestId('next-pokemon')).toBeDisabled();
  });

  it('contém um botão para resetar  o filtro', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    userEvent.click(screen.getByRole('button', { name: 'Poison' }));
    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent('Ekans');
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent('Pikachu');
  });
});
