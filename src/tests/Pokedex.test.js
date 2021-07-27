import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderRouter from './renderRouter';
import App from '../App';

describe('Teste dos componentes do <Pokedex.js/>', () => {
  it('Teste se página contém um h2 com txt encountered pokemons', () => {
    const { getByRole } = renderRouter(<App />);
    const title = getByRole('heading', { level: 2, name: /Encountered pokémons/ });
    expect(title).toBeInTheDocument();
  });

  it('É exibido o próximo Pokémon da lista quando o botão próximo é clicado', () => {
    const { getByRole, getByText } = renderRouter(<App />);
    const button = getByRole('button', { name: /Próximo pokémon/ });
    const pikachu = getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    fireEvent.click(button);
    const charmander = getByText(/Charmander/i);
    expect(charmander).toBeInTheDocument();
    const n = 6;
    for (let index = 0; index < n; index += 1) {
      fireEvent.click(button);
    }
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByText } = renderRouter(<App />);
    const pokemons = getAllByText(/kg/i);
    expect(pokemons.length).toEqual(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    const { getByRole } = renderRouter(<App />);
    const all = getByRole('button', { name: /All/i });
    const fire = getByRole('button', { name: /Fire/i });
    const bug = getByRole('button', { name: /Bug/i });
    const poison = getByRole('button', { name: /Poison/i });
    const psychic = getByRole('button', { name: /Psychic/i });
    const normal = getByRole('button', { name: /Normal/i });
    const dragon = getByRole('button', { name: /Dragon/i });

    expect(all).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderRouter(<App />);
    const button = getByRole('button', { name: 'All' });
    const nofilter = getByText('Pikachu');
    fireEvent.click(button);
    expect(nofilter).toBeInTheDocument();
  });

  it('Criado, dinamicamente, um botão de filtro para cada tipo de Pokémon', () => {
    const { getAllByTestId } = renderRouter(<App />);
    const buttons = getAllByTestId('pokemon-type-button');
    const numOfButtons = 7;
    expect(buttons.length).toBe(numOfButtons);
  });
});
