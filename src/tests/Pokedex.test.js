import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa se o componente pokedex', () => {
  it('possui o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const pokedexTest = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(pokedexTest).toBeInTheDocument();
  });
  it('exibe o proximo pokemon ao clicar no botão com esse nome', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/Home/));
    expect(screen.getByAltText(/Pikachu sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Charmander sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Caterpie sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Ekans sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Alakazam sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Mew sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Rapidash sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Snorlax sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Dragonair sprite/)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Próximo pokémon/i));
    expect(screen.getByAltText(/Pikachu sprite/)).toBeInTheDocument();
  });

  it('mostra um pokemon por vez', () => {
    renderWithRouter(<App />);
    const numberOfPokemon = screen.getAllByText(/More details/i);
    expect(numberOfPokemon).toHaveLength(1);
  });

  it('mostra os filtros por tipo e se eles funcionam', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getByTestId('pokemon-type');
    userEvent.click(screen.getByRole('button', { name: 'Electric' }));
    expect(pokeType).toHaveTextContent('Electric');
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(pokeType).toHaveTextContent('Fire');
    userEvent.click(screen.getByRole('button', { name: 'Bug' }));
    expect(pokeType).toHaveTextContent('Bug');
    userEvent.click(screen.getByRole('button', { name: 'Poison' }));
    expect(pokeType).toHaveTextContent('Poison');
    userEvent.click(screen.getByRole('button', { name: 'Psychic' }));
    expect(pokeType).toHaveTextContent('Psychic');
    userEvent.click(screen.getByRole('button', { name: 'Normal' }));
    expect(pokeType).toHaveTextContent('Normal');
    userEvent.click(screen.getByRole('button', { name: 'Dragon' }));
    expect(pokeType).toHaveTextContent('Dragon');
  });

  it('se o botão All está sempre visível', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
  });

  it('se ao clicar no All os filtros são removidos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('button', { name: 'Fire' }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Charmander');
    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  });
});
