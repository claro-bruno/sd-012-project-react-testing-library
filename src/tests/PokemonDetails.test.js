import React from 'react';
import { screen, fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente PokemonDetails', () => {
  const mockedPokemon = pokemons[0];

  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${mockedPokemon.id}`);

      const detailsTitle = screen.getByText(`${mockedPokemon.name} Details`);
      const linkToDetail = screen.queryByRole('link', { name: 'More details' });
      const summaryTitle = screen.getByRole('heading', { name: 'Summary', level: 2 });
      const summary = screen.getByText(mockedPokemon.summary);

      expect(detailsTitle).toBeInTheDocument();
      expect(linkToDetail).not.toBeInTheDocument();
      expect(summaryTitle).toBeInTheDocument();
      expect(summary).toBeInTheDocument();
    });

  test('Teste se existe na página uma seção com os mapas das localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${mockedPokemon.id}`);

      const locationsTitle = screen.getByText(`Game Locations of ${mockedPokemon.name}`);
      expect(locationsTitle).toBeInTheDocument();

      mockedPokemon.foundAt.forEach((area, index) => {
        const locationName = screen.getByText(area.location);
        expect(locationName).toBeInTheDocument();

        const imgAlt = mockedPokemon.name;
        const imgUrl = area.map;
        const image = screen.getAllByAltText(`${imgAlt} location`);
        expect(image[index]).toHaveProperty('src', imgUrl);
      });
    });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${mockedPokemon.id}`);

      const checkbox = screen.getByLabelText('Pokémon favoritado?');
      expect(checkbox).toBeInTheDocument();

      expect(screen
        .queryByAltText(`${mockedPokemon.name} is marked as favorite`))
        .not.toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(screen
        .queryByAltText(`${mockedPokemon.name} is marked as favorite`))
        .toBeInTheDocument();

      fireEvent.click(checkbox);
      expect(screen
        .queryByAltText(`${mockedPokemon.name} is marked as favorite`))
        .not.toBeInTheDocument();
    });
});
