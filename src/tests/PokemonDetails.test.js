import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Requisito 7', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
  });

  it('As informações detalhadas do Pokémon selecionado devem ser exibidas', () => {
    const { name, summary } = pokemons[0];
    const pageTitle = screen.getByRole('heading',
      { level: 2, name: `${name} Details` });
    const linksOnThisPage = screen.getAllByRole('link');
    const numberOfLinks = 3;
    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    const pokemonSummary = screen.getByText(summary);
    expect(pageTitle).toBeInTheDocument();
    expect(linksOnThisPage).toHaveLength(numberOfLinks);
    expect(summaryHeading).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Deve existir na página uma seção contendo as localizações do pokémon', () => {
    const { name, foundAt } = pokemons[0];
    const sectionTitle = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(sectionTitle).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      const localTitle = screen.getByText(location);
      const mapImage = screen.getAllByAltText(`${name} location`);
      expect(localTitle).toBeInTheDocument();
      expect(mapImage[index].src).toBe(map);
    });
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { name } = pokemons[0];
    const favoriteCheckbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    expect(favoriteCheckbox).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);
    const favoritedPokemonImage = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritedPokemonImage).toBeInTheDocument();
    fireEvent.click(favoriteCheckbox);
    expect(favoritedPokemonImage).not.toBeInTheDocument();
  });
});
