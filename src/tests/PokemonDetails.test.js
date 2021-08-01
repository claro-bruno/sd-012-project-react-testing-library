import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helper/RendeWithRouter';

describe('Testa componente PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/151');
  });
  test('Verifica se os detalhes do pokemon renderiza', () => {
    const title = screen.getByRole('heading', { name: /mew details/i,
      level: 2 });
    expect(title).toBeInTheDocument();

    const textH2 = screen.getByRole('heading', { name: 'Summary',
      level: 2 });
    expect(textH2).toBeInTheDocument();

    const summary = screen.getByText(/Apparently, it appears only to those people/i);
    expect(summary).toBeInTheDocument();
  });
  test('Verifica se renderiza a localização de um pokemon', () => {
    const titleLoc = screen.getByRole('heading', { name: /Game Locations of mew/i,
      level: 2 });
    expect(titleLoc).toBeInTheDocument();

    const imgLoc = screen.getByRole('img', { name: /mew location/i });
    expect(imgLoc).toBeInTheDocument();
    expect(imgLoc).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
  });
  test('Verifica se é possível favoritar o pokemon', () => {
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favCheckbox).toBeInTheDocument();
    expect(favCheckbox).not.toBeChecked();

    userEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();

    userEvent.click(favCheckbox);
    expect(favCheckbox).not.toBeChecked();
  });
});
