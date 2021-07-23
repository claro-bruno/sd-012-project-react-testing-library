import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity '
    + 'to make them tender enough to eat.',
};

describe('Teste do Component PokemonDetails.', () => {
  test('Verifica se as informações detalhadas '
    + 'do Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByText('More details');
    history.push(`/pokemons/${pokemon.id}`);
    const headingDetails = screen.getByText(`${pokemon.name} Details`);
    const headingSummary = screen.getByText('Summary');
    const paragraphSummary = screen.getByText(`${pokemon.summary}`);

    expect(headingDetails).toBeInTheDocument();
    expect(headingSummary).toBeInTheDocument();
    expect(paragraphSummary).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
  });

  test('Verifica se existe na página uma seção com os mapas '
    + 'contendo as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    const headingLocations = screen.getByText(`Game Locations of ${pokemon.name}`);

    expect(headingLocations).toBeInTheDocument();

    pokemon.foundAt.forEach((location, i) => {
      const imgLocation = screen.getAllByAltText(`${pokemon.name} location`);
      const paragraphLocation = screen.getByText(`${location.location}`);

      expect(imgLocation[i]).toBeInTheDocument();
      expect(imgLocation[i].src).toBe(`${location.map}`);
      expect(paragraphLocation).toBeInTheDocument();
    });
  });

  test('Verifica se o usuário pode favoritar um pokémon '
    + 'através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');

    expect(favoriteCheckbox).not.toBeChecked();

    fireEvent.click(favoriteCheckbox);

    expect(favoriteCheckbox).toBeChecked();
  });
});
