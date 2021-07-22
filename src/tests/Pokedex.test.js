import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokeNameTestId = 'pokemon-name';

describe('requisito 5- testa componente Pokedex.js', () => {
  it('contem heading com texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const head = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(head).toBeInTheDocument();
  });

  it('testa button proximo pokemon', () => {
    renderWithRouter(<App />);
    const pokemon1 = screen.getByTestId(pokeNameTestId);
    expect(pokemon1).toBeInTheDocument();
    expect(pokemon1.innerHTML).toBe('Pikachu');

    userEvent.click(screen.getByTestId('next-pokemon'));

    const pokemon2 = screen.getByTestId(pokeNameTestId);
    expect(pokemon2).toBeInTheDocument();
    expect(pokemon2.innerHTML).toBe('Charmander');
  });

  it('é mostrado apenas um pokemon', () => {
    renderWithRouter(<App />);

    const pokeList = screen.getAllByTestId(pokeNameTestId);
    expect(pokeList.length).toBe(1);

    userEvent.click(screen.getByRole('button', { name: 'Fire' }));

    const pokeList2 = screen.getAllByTestId(pokeNameTestId);
    expect(pokeList2.length).toBe(1);
  });

  it('possui buttons de filtro por tipo', () => {
    renderWithRouter(<App />);
    const typesAmount = 7;
    const btnList = screen.getAllByTestId('pokemon-type-button');
    expect(btnList.length).toBe(typesAmount);
  });

  it('possui button All que reseta o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();
    expect(allBtn.innerHTML).toBe('All');

    const pokemon1 = screen.getByTestId(pokeNameTestId);
    expect(pokemon1).toBeInTheDocument();
    expect(pokemon1.innerHTML).toBe('Pikachu');

    userEvent.click(screen.getByRole('button', { name: 'Poison' }));

    const pokemon2 = screen.getByTestId(pokeNameTestId);
    expect(pokemon2.innerHTML).toBe('Ekans');

    userEvent.click(allBtn);

    expect(pokemon1).toBeInTheDocument();
  });
});
