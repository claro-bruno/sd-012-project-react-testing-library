import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o component Pokedex.js', () => {
  it('Testa se página contém um heading h2 com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', { level: 2 }).innerHTML;
    expect(heading).toBe('Encountered pokémons');
  });

  it('Testa se é exibido o próximo Pokémon quando o botão "Próximo pokémon" é clicado.',
    () => {
      renderWithRouter(<App />);
      const getButton = screen.getByText(/Próximo pokémon/i);
      userEvent.click(getButton);
      const getNextPokemon = screen.getByText(/Charmander/i);
      expect(getNextPokemon).toBeInTheDocument();
    });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const fire = screen.getByText(/Fire/i);
    userEvent.click(fire);

    const type = screen.getByTestId('pokemon-type').innerHTML;
    const button = screen.getAllByTestId('pokemon-type-button');
    expect(type).toBe(button[1].innerHTML);

    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();

    const nextButton = screen.getByText(/Próximo pokémon/i);
    userEvent.click(nextButton);

    const rapidash = screen.getByText(/Rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(nextButton);
    expect(charmander).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByText(/All/i);
    expect(buttonAll).toBeInTheDocument();

    const buttonBug = screen.getByText(/Bug/i);
    userEvent.click(buttonBug);
    const caterpie = screen.getByText(/Caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const nextButton = screen.getByText(/Próximo pokémon/i);
    userEvent.click(nextButton);
    const charmander = screen.getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
  });

  it('Testa filtro dinamicamente para cada tipo de pokemon', () => {
    renderWithRouter(<App />);

    const electric = screen.getAllByText(/Electric/i);
    expect(electric.length).toBe(2);

    const normal = screen.getByText(/Normal/i);
    expect(normal).toBeInTheDocument();

    const fire = screen.getByText(/Fire/i);
    expect(fire).toBeInTheDocument();

    const dragon = screen.getByText(/Dragon/i);
    expect(dragon).toBeInTheDocument();

    const bug = screen.getByText(/Bug/i);
    expect(bug).toBeInTheDocument();

    const poison = screen.getByText(/Poison/i);
    expect(poison).toBeInTheDocument();

    const psychic = screen.getByText(/Psychic/i);
    expect(psychic).toBeInTheDocument();
  });

  it('Testa se o bottão de próximo pokemon é desabilitado quando tem apenas um pokemon',
    () => {
      renderWithRouter(<App />);
      const bugButton = screen.getByText(/Bug/);
      userEvent.click(bugButton);

      const nextButton = screen.getByText(/Próximo pokémon/);
      expect(nextButton).toBeDisabled();

      const psyButton = screen.getByText(/Psychic/);
      userEvent.click(psyButton);
      expect(nextButton).toBeEnabled();
    });
});
