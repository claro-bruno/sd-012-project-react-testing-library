import { screen } from '@testing-library/react';
import React from 'react';
// import { Pokedex } from '../components';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Test "Pokedex" components', () => {
  // beforeEach(() => renderWithRouter(<App />));

  it('Tests if page contains text "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const h2Element = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2Element).toBeInTheDocument();
  });

  it('Tests if is shown next Pokémon, when "Próximo pokémon" is clicked', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/ });

    userEvent.click(nextPokemonButton);
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });

  it('Tests if is shown just one Pokémon at a time', () => {
    
  });
});
