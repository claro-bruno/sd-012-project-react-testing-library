import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => {
    renderWithRouter(<App />);
    const pokemons = [];
    const quantity = 9;
    for (let i = 0; i <= quantity; i += 1) {
      pokemons.push(screen.getByTestId('pokemon-name'));
      fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
      const condition = pokemons[i] === pokemons[i - 1];
      if (pokemons[i - 1]) {
        expect(condition).toEqual(true);
      } else expect(condition).toEqual(false);
    }
    fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    expect(screen.getByTestId('pokemon-name')).toEqual(pokemons[quantity - 1]);
  });
});
