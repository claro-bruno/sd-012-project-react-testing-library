import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando todo o meu componente PokemonDetails', () => {
  it('Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();

    let details = screen.getByText('More details');
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const detailsHeader = screen.getByText(`${namePokemon.textContent} Details`);
    expect(detailsHeader).toBeInTheDocument();

    details = screen.queryByText('More details');
    expect(details).toBeNull();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const infoPokemon = screen.queryByText(/^.{50,}$/g);
    expect(infoPokemon).toBeInTheDocument();
    expect(infoPokemon.tagName).toBe('P');

    const pokemonLocation = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${namePokemon.textContent}` });
    expect(pokemonLocation).toBeInTheDocument();

    const imageMap = screen.getAllByAltText(`${namePokemon.textContent} location`);
    expect(imageMap.length).not.toBe(0);
    imageMap.forEach((e) => {
      expect(e).toBeInTheDocument();
      expect(e.src).toContain('http');
    });

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    const favoriteInput = screen.getByRole('checkbox');

    expect(favoriteLabel).toBeInTheDocument();
    expect(favoriteInput.checked).toBe(false);
    userEvent.click(favoriteInput);
    expect(favoriteInput.checked).toBe(true);
  });
});
