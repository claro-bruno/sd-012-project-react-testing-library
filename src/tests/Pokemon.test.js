import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import PokemonFilter from './PokemonFilter';

describe('Testa o componente Pokemon.js', () => {
  renderWithRouter(<App />);

  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    const Pokemon = PokemonFilter(screen, 'Pikachu');
    const { PokeName, PokeType, PokeWeight, PokeURL, PokeDetails } = Pokemon;
    expect(PokeName).toContainHTML('Pikachu');
    expect(PokeType).toContainHTML('Electric');
    expect(PokeWeight).toContainHTML('Average weight: 6.0 kg');
    expect(PokeURL).toContainHTML('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(PokeDetails).toContainHTML('/pokemons/25');
  });

  test('Testa se ao clicar no link é redirecionado para os detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/More details/));
    const details = screen.getByText(/Pikachu Details/);
    expect(details).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
    fireEvent.click(screen.getByText(/Pokémon favoritado/));
    const PokeStar = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(PokeStar).toBeDefined();
    expect(PokeStar).toContainHTML('/star-icon.svg');
  });
});
