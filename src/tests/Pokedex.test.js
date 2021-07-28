import React from 'react';
import { screen } from '@testing-library/react';
import event from '@testing-library/user-event';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './RenderWithRouter';

describe('testando a pagina pokedex', () => {
  it('verificando se página contém uma tag h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toHaveTextContent(/Encountered pokémons/i);
  });
  it('testa se tem um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });

  it('testa se é exibido o próximo Pokémon quando o botão pokémon é clicado', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      const poke = screen.getByText(pokemon.name);
      event.click(btnNext);
      expect(poke).toBeInTheDocument();
    });
  });

  it('testa os filtros dos botões', () => {
    renderWithRouter(<App />);
    const retButtons = screen.getAllByTestId('pokemon-type-button');
    const nove = 9;
    const pokemonTypes = [...new Set(pokemons.map((pokemon) => pokemon.type))];
    pokemonTypes.forEach((types) => {
      const buttonFilter = retButtons.filter((button) => button.textContent === types);
      expect(buttonFilter.length).toBe(1);
      const buttons = screen.getByRole('button', { name: types });
      expect(buttons).toBeInTheDocument();
      event.click(buttons);
      const pokemonsTipos = screen.getAllByTestId('pokemon-type');
      const filtraTypos = pokemonsTipos.filter((type) => type.textContent === types);
      expect(pokemonsTipos.length).toBe(filtraTypos.length);
      const buttonAll = screen.getByRole('button', { name: /All/i });
      expect(buttonAll).toBeInTheDocument();
      event.click(buttonAll);
      expect(pokemons.length).toBe(nove);
    });
  });

  it('verifica o botão all', () => {
    renderWithRouter(<App />);
    const nove = 9;
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const PsychicButton = screen.getByRole('button', { name: /psychic/i });
    expect(buttonAll).toBeInTheDocument();
    event.click(PsychicButton);
    const qtdPsychic = pokemons.filter((type) => type.type === 'Psychic');
    expect(qtdPsychic.length).toBe(2);
    event.click(buttonAll);
    expect(pokemons.length).toBe(nove);
  });
});
