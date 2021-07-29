import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const dragonairData = pokemons[8]; // teste com o pokémon Dragonair
const { id, name, summary, foundAt } = dragonairData;

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  history.push(`/pokemons/${id}`);
});

describe('Testa o componente PokemonDetails.js', () => {
  it('Testa as informações detalhadas do Pokémon mostradas na tela', () => {
    const headingText = `${name} Details`;
    expect(screen.getByRole('heading', { name: headingText })).toBeInTheDocument();

    expect(screen.queryByText('More details')).not.toBeInTheDocument();

    expect(screen.getByText('Summary')).toBeInTheDocument();

    expect(screen.getByText(`${summary}`)).toBeInTheDocument();
  });
  it('Testa a seção com os mapas contendo as localizações do pokémon', () => {
    const headingText = `Game Locations of ${name}`;
    expect(screen.getByRole('heading', { name: headingText })).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      const mapImage = screen.getAllByAltText(`${name} location`);
      expect(mapImage[index]).toHaveAttribute('src', map);
      expect(mapImage[index]).toHaveAttribute('alt', `${name} location`);

      expect(screen.getByText(`${location}`)).toBeInTheDocument();
    });
  });
  it('Testa favoritar um pokémon através da página de detalhes', () => {
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const starImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(starImage).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(starImage).not.toBeInTheDocument();
  });
});
