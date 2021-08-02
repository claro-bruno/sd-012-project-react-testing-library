
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing Pokedex/App Component, Fifth Requirement', () => {
  const proximoPokemon = 'Próximo pokémon';
  it('There is an h2 title with the "Encountered pokémons" text', () => {
    renderWithRouter(<App />);
    const EncounteredPokemonsLink = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });

    expect(EncounteredPokemonsLink).toBeInTheDocument();
  });
  it('the next pokemon is showed when the right button is clicked" and one at time',
    () => {
      renderWithRouter(<App />);
      const buttonNextPokemon = screen.getByRole('button', {
        name: proximoPokemon,
      });
      expect(buttonNextPokemon).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Charmander = screen.getByText('Charmander');
      expect(Charmander).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Caterpie = screen.getByText('Caterpie');
      expect(Caterpie).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Ekans = screen.getByText('Ekans');
      expect(Ekans).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Alakazam = screen.getByText('Alakazam');
      expect(Alakazam).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Mew = screen.getByText('Mew');
      expect(Mew).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Rapidash = screen.getByText('Rapidash');
      expect(Rapidash).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Snorlax = screen.getByText('Snorlax');
      expect(Snorlax).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Dragonair = screen.getByText('Dragonair');
      expect(Dragonair).toBeInTheDocument();

      userEvent.click(buttonNextPokemon);
      const Pikachu = screen.getByText('Pikachu');
      expect(Pikachu).toBeInTheDocument();
    });
  it('The filter buttons work', () => {
    renderWithRouter(<App />);
    const buttonType = screen.getByRole('button', {
      name: 'Psychic',
    });
    expect(buttonType).toBeInTheDocument();
    userEvent.click(buttonType);
    const Alakazam = screen.getByText('Alakazam');
    expect(Alakazam).toBeInTheDocument();

    const nextButton = screen.getByRole('button', {
      name: proximoPokemon,
    });
    userEvent.click(nextButton);
    const Mew = screen.getByText('Mew');
    expect(Mew).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(Alakazam).toBeInTheDocument();
  });
  it('The reset filter button works', () => {
    renderWithRouter(<App />);
    const buttonTypeAll = screen.getByRole('button', { name: 'All' });
    expect(buttonTypeAll).toBeInTheDocument();
    userEvent.click(buttonTypeAll);
    const Pikachu = screen.getByText('Pikachu');
    expect(Pikachu).toBeInTheDocument();
    const buttonNextPokemon = screen.getByRole('button', {
      name: proximoPokemon,
    });
    expect(buttonNextPokemon).toBeInTheDocument();
    userEvent.click(buttonNextPokemon);
    const Charmander = screen.getByText('Charmander');
    expect(Charmander).toBeInTheDocument();
  });
  it('Each pokemon has a filter button works', () => {
    renderWithRouter(<App />);
    const buttonTypeAll = screen.getByRole('button', { name: 'All' });
    const buttonTypeFire = screen.getByRole('button', {
      name: 'Fire',
    });
    const buttonTypeElectric = screen.getByRole('button', {
      name: 'Electric',
    });
    const buttonTypeBug = screen.getByRole('button', {
      name: 'Bug',
    });
    const buttonTypePoison = screen.getByRole('button', {
      name: 'Poison',
    });
    const buttonTypePsychic = screen.getByRole('button', {
      name: 'Psychic',
    });
    const buttonTypeNormal = screen.getByRole('button', {
      name: 'Normal',
    });
    const buttonTypeDragon = screen.getByRole('button', {
      name: 'Dragon',
    });

    const seven = 7;
    const pokemonTypeButton = screen.getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButton.length).toBe(seven);
    // poderia ter sido muito mais simples usando estruturas de repetição do ES6,
    // mas não consigo por conta do screen

    expect(buttonTypeFire).toBeInTheDocument();
    expect(buttonTypeElectric).toBeInTheDocument();
    expect(buttonTypeBug).toBeInTheDocument();
    expect(buttonTypePoison).toBeInTheDocument();
    expect(buttonTypePsychic).toBeInTheDocument();
    expect(buttonTypeNormal).toBeInTheDocument();
    expect(buttonTypeDragon).toBeInTheDocument();
    expect(buttonTypeAll).toBeVisible();
    userEvent.click(buttonTypeBug);
    const buttonNextPokemon = screen.getByRole('button', {
      name: proximoPokemon,
    });
    expect(buttonNextPokemon).toBeDisabled();
  });
});