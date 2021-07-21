import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokedex />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se o próximo pokemon da lista é exibido', () => {
    renderWithRouter(<App />);
    const btn = screen.getAllByRole('button')[8];
    expect(btn).toHaveTextContent(/Próximo pokémon/i);

    userEvent.click(btn);
    const nextPokemon = screen.getByText(/charmander/i);
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const btn = screen.getAllByRole('button')[8];
    expect(btn).toHaveTextContent(/Próximo pokémon/i);

    userEvent.click(btn);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(btn);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });

  it('Testa se a pokedex contém botões para filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getAllByRole('button')[0];
    expect(allBtn).toHaveTextContent(/all/i);
    userEvent.click(allBtn);

    const electricBtn = screen.getAllByRole('button')[1];
    expect(electricBtn).toHaveTextContent(/electric/i);
    userEvent.click(electricBtn);

    const fireBtn = screen.getAllByRole('button')[2];
    expect(fireBtn).toHaveTextContent(/fire/i);
    userEvent.click(fireBtn);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    const nextPokemon = screen.getAllByRole('button')[8];
    userEvent.click(nextPokemon);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    const bugBtn = screen.getAllByRole('button')[3];
    expect(bugBtn).toHaveTextContent(/bug/i);
    userEvent.click(bugBtn);

    const poisonBtn = screen.getAllByRole('button')[4];
    expect(poisonBtn).toHaveTextContent(/poison/i);
    userEvent.click(poisonBtn);

    const psychicBtn = screen.getAllByRole('button')[5];
    expect(psychicBtn).toHaveTextContent(/psychic/i);
    userEvent.click(psychicBtn);

    const normalBtn = screen.getAllByRole('button')[6];
    expect(normalBtn).toHaveTextContent(/normal/i);
    userEvent.click(normalBtn);

    const dragonBtn = screen.getAllByRole('button')[7];
    expect(dragonBtn).toHaveTextContent(/dragon/i);
    userEvent.click(dragonBtn);
  });
});
