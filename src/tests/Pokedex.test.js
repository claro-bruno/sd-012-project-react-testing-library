import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('testa o componente pokedex', () => {
  it('testa o conteúdo do heading', () => {
    const headingText = screen.getByText('Encountered pokémons');
    expect(headingText).toBeDefined();
  });

  it('Testa se o próximo pokémon é exibido ao clicar no botão', () => {
    const button = screen.getByText(/Próximo pokémon/i);
    userEvent.click(button);

    const nextPokemon = screen.getByTestId('pokemon-name');
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa o botão de resetar os filtros', () => {
    const filterButtonAll = screen.getByRole('button', { name: 'All' });
    expect(filterButtonAll).toBeDefined();
    userEvent.click(filterButtonAll);

    const firstPokemon = screen.getByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Testa os botões de filtrar por tipo', () => {
    const fireFilter = screen.getByRole('button', { name: 'Fire' });
    expect(fireFilter).toHaveTextContent('Fire');
    userEvent.click(fireFilter);
    const firePokemon = screen.getByText('Charmander');
    expect(firePokemon).toBeInTheDocument();

    const nextPokemon = screen.getByText('Próximo pokémon');
    userEvent.click(nextPokemon);
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
  });
});
