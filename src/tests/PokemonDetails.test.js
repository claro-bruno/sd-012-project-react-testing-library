import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import data from '../data';

beforeEach(() => {
  renderWithRouter(<App />);

  userEvent.click(screen.getByText('More details'));
});

describe('Testa componente <PokemonDetails />', () => {
  const pokemon = data[0];
  it('Testa as informações detalhadas do Pokémon', () => {
    expect(screen.getByText(`${pokemon.name} Details`)).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByText(`${pokemon.summary}`)).toBeInTheDocument();
  });

  it('Testa se há um seção com mapas das localizações do pokémon', () => {
    const heading = screen.getByText(`Game Locations of ${pokemon.name}`);
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(`${pokemon.name} Details`)).toBeInTheDocument();

    const mapas = screen.getAllByAltText(`${pokemon.name} location`);
    expect(mapas.length).toBe(pokemon.foundAt.length);

    pokemon.foundAt.forEach(({ location }) => {
      expect(screen.getByText(location)).toBeInTheDocument();
    });

    mapas.forEach((mapa, index) => {
      expect(mapa.src).toBe(pokemon.foundAt[index].map);
    });
  });

  it('Testa se é possível adicionar aos favoritos pelo Movie Details', () => {
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);

    const estrela = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(estrela).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(estrela).not.toBeInTheDocument();
  });
});
