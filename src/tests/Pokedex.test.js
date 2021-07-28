import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => {
  renderWithRouter(<App />);
});
afterEach(cleanup);

const pokemonId = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });

    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    pokemons.forEach((pokemon) => {
      const proxButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
      const idPokemon = screen.getByTestId('pokemon-name');

      expect(idPokemon).toHaveTextContent(pokemon.name);
      userEvent.click(proxButton);
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const pokemon = screen.getAllByTestId(pokemonId);
    expect(pokemon.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(types.length);
  });

  it('contém um botão para resetar  o filtro', () => {
    const buttonPsychic = screen.getByRole('button', { name: 'Psychic' });
    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(buttonPsychic).toHaveTextContent('Psychic');
    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonPsychic);
    userEvent.click(buttonAll);
  });
});

export default App;
