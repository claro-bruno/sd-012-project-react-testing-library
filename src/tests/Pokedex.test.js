import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <Pokedex />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se o próximo pokemon da lista é exibido', () => {
    const nextBtn = screen.getByText('Próximo pokémon');
    userEvent.click(nextBtn);

    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um pokémon por vez', () => {
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

  it('Testa se a pokedex contem um botao para resetar o fitro', () => {
    const allBtn = screen.getByRole('button', { name: 'All' });
    const noFilter = screen.getByText(/pikachu/i);
    userEvent.click(allBtn);
    expect(noFilter).toBeInTheDocument();
  });
});
