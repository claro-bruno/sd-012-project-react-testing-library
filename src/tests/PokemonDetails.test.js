import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa a página de detalhes do Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetailsLink);
  });

  it('testa se as inforamções detalhadas são exibidas na tela', () => {
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

  it('testa se a página contém uma seção com as areas onde acha-se o pokemon', () => {
    const { name, foundAt } = pokemons[0];
    const sectionTitle = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(sectionTitle).toBeInTheDocument();
    foundAt.forEach(({ location }) => {
      const localTitle = screen.getByText(location);
      expect(localTitle).toBeInTheDocument();
    });
  });
});
