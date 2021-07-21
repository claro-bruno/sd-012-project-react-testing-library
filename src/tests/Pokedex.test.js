import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste componente Pokedex', () => {
  it('Testa se a página contém um heading com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon ao clicar em "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextPokemonButton);
    const nextPokemonName = screen.getByText(/charmander/i);
    expect(nextPokemonName).toBeInTheDocument();
  });

  it('Testa se os botões de filtro funcionam', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    expect(typeButtons[1]).toHaveTextContent(/fire/i);
    userEvent.click(typeButtons[1]);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/Fire/i);
  });

  it('Testa se ao clicar no botão "All", o filtro reseta', () => {
    renderWithRouter(<App />);
    const allFilter = screen.getByRole('button', { name: /all/i });
    userEvent.click(allFilter);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);
  });
});
