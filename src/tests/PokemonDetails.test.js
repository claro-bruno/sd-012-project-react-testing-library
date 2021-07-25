import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('7 - Testa o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se as informações detalhadas do Pokémon selecionado são'
      + ' mostradas na tela', () => {
    userEvent.click(screen.getByRole('link', { name: /More details/i }));

    expect(screen.getByRole(
      'heading',
      { name: `${pokemons[0].name} Details`, level: 2 },
    )).toBeInTheDocument();

    const linkToDetails = screen.queryByRole('link', { name: /More details/i });
    expect(linkToDetails).not.toBeInTheDocument();

    const titleDetails = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(titleDetails).toBeInTheDocument();

    const paragraphDetails = screen.getByText(pokemons[0].summary);
    expect(paragraphDetails).toBeInTheDocument();
  });

  it('Verifica se existe na página uma seção com os mapas contendo as'
      + ' localizações do pokémon', () => {
    userEvent.click(screen.getByRole('link', { name: /More details/i }));

    const titleDetails = screen.getByRole(
      'heading',
      { name: `Game Locations of ${pokemons[0].name}`, level: 2 },
    );
    expect(titleDetails).toBeInTheDocument();

    const locationQuantity = screen
      .getAllByRole('img', { name: `${pokemons[0].name} location` }).length;
    expect(locationQuantity).toEqual(pokemons[0].foundAt.length);
    const locations = screen
      .getAllByRole('img', { name: `${pokemons[0].name} location` });

    locations.forEach((location, index) => {
      const locationImageSrc = location.attributes.src.textContent;
      const locationImageAlt = location.attributes.alt.textContent;
      expect(locationImageSrc).toEqual(pokemons[0].foundAt[index].map);
      expect(locationImageAlt).toEqual(`${pokemons[0].name} location`);
      const locationsTitle = screen.getByText(pokemons[0].foundAt[index].location);
      expect(locationsTitle).toHaveTextContent(pokemons[0].foundAt[index].location);
    });
  });

  it('Verifica se o usuário pode favoritar um pokémon através da'
      + ' página de detalhes', () => {
    userEvent.click(screen.getByRole('link', { name: /More details/i }));

    const checkboxInput = screen.getByRole('checkbox');
    expect(checkboxInput).toBeInTheDocument();

    userEvent.click(checkboxInput);
    const altAttribute = `${pokemons[0].name} is marked as favorite`;
    const favoriteIcon = screen.getByRole('img', { name: altAttribute });
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(checkboxInput);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
