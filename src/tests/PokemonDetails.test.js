import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('Verifica se as informações na tela de detalhas estão corretas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('Próximo pokémon');
    userEvent.click(moreDetails);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName.innerHTML).toBe('Charmander');
    expect(pokemonType.innerHTML).toBe('Fire');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 8.5 kg');
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});
