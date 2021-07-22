import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('testa o Pokedex Page', () => {
  it('testa se tem o h2', () => {
    renderWithRouter(<App />);
    const checkh2 = screen.getByRole('heading', { level: 2 });
    expect(checkh2).toHaveTextContent('Encountered pokémons');
  });
  it('testando botao de "Próximo pokémon" ', () => {
    renderWithRouter(<App />);
    const next = screen.getByRole('button', { name: /Próximo pokémon/i });
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const n = 7;
    for (let i = 0; i < n; i += 1) {
      userEvent.click(next);
    }
    expect(pikachu).toBeInTheDocument();
  });
  it('testa se mostra so 1 pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByText(/details/i);
    expect(pokemon.length).toEqual(1);
  });
  it('testa os botoes que filtram tipos', () => {
    renderWithRouter(<App />);
    const allTypes = screen.getByRole('button', { name: /All/i });
    const normalType = screen.getByRole('button', { name: /Normal/i });
    const dragonType = screen.getByRole('button', { name: /Dragon/i });
    const poisonType = screen.getByRole('button', { name: /Poison/i });
    const fireType = screen.getByRole('button', { name: /Fire/i });
    const bugType = screen.getByRole('button', { name: /Bug/i });
    const psychicType = screen.getByRole('button', { name: /Psychic/i });
    expect(allTypes).toBeInTheDocument();
    expect(normalType).toBeInTheDocument();
    expect(dragonType).toBeInTheDocument();
    expect(poisonType).toBeInTheDocument();
    expect(fireType).toBeInTheDocument();
    expect(bugType).toBeInTheDocument();
    expect(psychicType).toBeInTheDocument();
  });
  it('testa o botao de reset', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    const pikachu = screen.getByText(/Pikachu/i);
    userEvent.click(allButton);
    expect(allButton).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
  });
  it('testa os botoes de todos os tipos', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(typeButtons.length).toBe(seven);
  });
  it('testa se o botao nao funcione quando nao tem mais opcoes', () => {
    renderWithRouter(<App />);
    const nextPoke = screen.getByRole('button', { name: /Próximo pokémon/ });
    const bug = screen.getByRole('button', { name: /Bug/i });
    userEvent.click(bug);
    expect(nextPoke).toBeDisabled();
    const poison = screen.getByRole('button', { name: /Poison/i });
    userEvent.click(poison);
    expect(nextPoke).toBeDisabled();
    const normal = screen.getByRole('button', { name: /Normal/i });
    userEvent.click(normal);
    expect(nextPoke).toBeDisabled();
    const dragon = screen.getByRole('button', { name: /Dragon/i });
    userEvent.click(dragon);
    expect(nextPoke).toBeDisabled();
  });
});
