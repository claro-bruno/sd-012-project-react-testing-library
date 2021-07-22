import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa todo PokemonDetails.js', () => {
  it('renderiza as info do pokemon', () => {
    const { history } = renderWithRouter(<App />);

    let linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);

    const pkmId = parseInt(history.location.pathname.split('/pokemons/')[1], 10);
    const pokemon = pokemons.find((pkm) => pkm.id === pkmId);

    const heading = screen.getByRole('heading', { name: `${pokemon.name} Details` });
    expect(heading).toBeInTheDocument();

    linkDetails = screen.queryByText(/More Details/i);
    expect(linkDetails).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /Summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const summaryText = screen.getByText(pokemon.summary);
    expect(summaryText).toBeInTheDocument();
  });
});
