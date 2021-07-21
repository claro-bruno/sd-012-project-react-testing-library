import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => renderWithRouter(<App />));

describe('Testa o componente <Pokedex />', () => {
  it('Teste se página contém um heading h2', () => {
    const h2 = screen.getByText('Encountered pokémons');

    expect(h2).toBeInTheDocument();
  });

  it('Testa se há um botão e se passa o pokémon a ser exibido', () => {
    const button = screen.getByText('Próximo pokémon');
    expect(button).toBeInTheDocument();
    userEvent.click(button);

    const nextPokemon = screen.getByTestId('pokemon-name');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa os botões de filtros', () => {
    const numberOfTypes = 7;
    const buttons = screen.getAllByTestId('pokemon-type-button');
    expect(buttons.length).toBe(numberOfTypes);

    const psychicButton = screen.getAllByTestId('pokemon-type-button')[4];
    expect(psychicButton).toBeInTheDocument();
    expect(psychicButton).toHaveTextContent('Psychic');
    userEvent.click(psychicButton);

    const firstPsychic = screen.getByText('Alakazam');
    expect(firstPsychic).toBeInTheDocument();

    userEvent.click(screen.getByText('Próximo pokémon'));

    const secondPsychic = screen.getByText('Mew');
    expect(secondPsychic).toBeInTheDocument();
  });

  it('Testa o botão All', () => {
    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });
});
