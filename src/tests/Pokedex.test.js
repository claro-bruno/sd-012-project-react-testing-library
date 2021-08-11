import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  it('Se a página contém um heading h2 com o texto Encountered pokémons.', () => {
    const h2Text = screen.getByRole('heading', { level: 2 });
    expect(h2Text).toHaveTextContent('Encountered pokémons');
  });
  it('Pokémons da lista devem ser mostrados, um a um, ao clicar...', () => {
    const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(`${pokemon.name}`)).toBeInTheDocument();
      userEvent.click(nextButton);
    });
    expect(screen.getByText(`${pokemons[0].name}`)).toBeInTheDocument();
  });
  it('Se é mostrado apenas 1 pokémon por vez', () => {
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  it('botão de filtragem para cada tipo de Pokémon, sem repetição', () => {
    const amountPokemonsType = 7;
    const amountbuttonType = screen.getAllByTestId('pokemon-type-button');
    expect(amountbuttonType).toHaveLength(amountPokemonsType);
  });
  it('somente pokémons daquele tipo & texto do botão deve corresponder ao tipo', () => {
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(fireButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(allButton).toBeDefined();
    userEvent.click(nextButton);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
    expect(allButton).toBeDefined();
    userEvent.click(allButton);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
