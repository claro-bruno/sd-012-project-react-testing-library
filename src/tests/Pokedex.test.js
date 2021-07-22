import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent(/Encountered pokémons/i);
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const nextPokemon = screen.getByText(/Próximo Pokémon/i);
    expect(nextPokemon).toBeInTheDocument();
  });
  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allBtn = screen.getByText(/All/i);
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);
  });
  it('Teste se aparece um botão para filtrar cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const pkTypeBtn = screen.getAllByTestId('pokemon-type-button');
    const typeOfPoks = 7;

    const allButton = screen.getByRole('button', { name: 'All' });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const electric = screen.getByRole('button', { name: 'Electric' });
    const poison = screen.getByRole('button', { name: 'Poison' });
    const psychic = screen.getByRole('button', { name: 'Psychic' });
    const dragon = screen.getByRole('button', { name: 'Dragon' });
    const normal = screen.getByRole('button', { name: 'Normal' });
    const bug = screen.getByRole('button', { name: 'Bug' });

    expect(pkTypeBtn).toHaveLength(typeOfPoks);
    expect(allButton).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
  });
});
