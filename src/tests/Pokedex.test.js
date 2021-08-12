import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const nextString = 'Próximo pokémon';

describe('Teste do Pokedex.js', () => {
  it('Checa o heading', () => {
    renderWithRouter(<App />);

    const btn = screen.getByText('Encountered pokémons');

    expect(btn).toBeInTheDocument();
  });

  it('Checa a exibição do Pokémon ao clicar', () => {
    renderWithRouter(<App />);

    const btn = screen.getByText(nextString);
    const pikachu = screen.getByText('Pikachu');

    expect(pikachu).toBeInTheDocument();

    fireEvent.click(btn);

    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();
  });

  it('Checar se um Pokémon é mostrado por vez', () => {
    renderWithRouter(<App />);

    const pokeNames = screen.getAllByTestId('pokemon-name');

    expect(pokeNames).toHaveLength(1);
  });

  it('Checa os botões de filtro do Pokédex', () => {
    renderWithRouter(<App />);

    const typePokemons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;

    expect(typePokemons).toHaveLength(seven);

    const btnTypePokemon = screen.getByText('Fire');

    fireEvent.click(btnTypePokemon);

    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();

    const btnNext = screen.getByText(nextString);

    fireEvent.click(btnNext);

    const rapidash = screen.getByText('Rapidash');

    expect(rapidash).toBeInTheDocument();

    const btnAll = screen.getByText('All');
    expect(btnAll).toBeInTheDocument();
  });

  it('Checa o btn de reset', () => {
    renderWithRouter(<App />);

    const allBtn = screen.queryByText('All');

    expect(allBtn).toBeInTheDocument();

    fireEvent.click(allBtn);

    const btnNext = screen.getByText(nextString);

    fireEvent.click(btnNext);

    const pikachu = screen.queryByText('Pikachu');

    expect(pikachu).toBeNull();
  });
});

// Utilizar a negação do toBeInTheDocument ao checar a existência de um elemento capturado, por exemplo, pelo queryByText.
