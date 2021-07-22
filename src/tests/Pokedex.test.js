import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  const nextPknm = 'Próximo pokémon';

  it('Teste se a pagina possui um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getAllByRole('heading');
    expect(h2[1]).toHaveTextContent('Encountered pokémons');
  });

  it('Teste se é exibido o próximo Pokémon da '
  + 'lista quando o botão Próximo pokémon é clicado.', () => {
    const len = pokemons.length;
    const firstPoke = pokemons[0].name;

    renderWithRouter(<App />);
    const btnProximo = screen.getByRole('button', { name: nextPknm });
    expect(btnProximo).toBeInTheDocument();

    pokemons.forEach((pokemon, index) => {
      const { name } = pokemon;
      const element = screen.getByText(name);
      fireEvent.click(btnProximo);
      expect(element).toBeInTheDocument();
      if (index === len - 1) {
        expect(element.innerHTML).toMatch(firstPoke);
      }
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const btnProximo = screen.getByRole('button', { name: nextPknm });

    pokemons.forEach(() => {
      const testIds = screen.getAllByTestId('pokemon-name');
      expect(testIds.length).toBe(1);
      fireEvent.click(btnProximo);
    });
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    let currentType;
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    const btnProximo = screen.getByRole('button', { name: nextPknm });
    const filterBtns = screen.getAllByTestId('pokemon-type-button');
    expect(filterBtns[0]).toHaveTextContent('Electric');
    expect(filterBtns[1]).toHaveTextContent('Fire');
    expect(filterBtns[2]).toHaveTextContent('Bug');
    expect(filterBtns[3]).toHaveTextContent('Poison');
    expect(filterBtns[4]).toHaveTextContent('Psychic');
    expect(filterBtns[5]).toHaveTextContent('Normal');
    expect(filterBtns[6]).toHaveTextContent('Dragon');

    fireEvent.click(filterBtns[0]);
    currentType = screen.getAllByText('Electric');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(filterBtns[1]);
    currentType = screen.getAllByText('Fire');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(btnProximo);
    fireEvent.click(filterBtns[1]);
    currentType = screen.getAllByText('Fire');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(filterBtns[2]);
    currentType = screen.getAllByText('Bug');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(filterBtns[3]);
    currentType = screen.getAllByText('Poison');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(filterBtns[4]);
    currentType = screen.getAllByText('Psychic');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(btnProximo);
    fireEvent.click(filterBtns[4]);
    currentType = screen.getAllByText('Psychic');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(filterBtns[5]);
    currentType = screen.getAllByText('Normal');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();

    fireEvent.click(filterBtns[6]);
    currentType = screen.getAllByText('Dragon');
    expect(currentType.length).toBe(2);
    expect(allBtn).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
  });
});
