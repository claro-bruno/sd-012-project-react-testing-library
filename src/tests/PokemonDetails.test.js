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
    const pageTitle = screen.getByRole('heading',
      { level: 2, name: (content) => content.includes('Details') });
    const linksOnThisPage = screen.getAllByRole('link');
    const numberOfLinks = 3;
    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    const { name, summary } = pokemons[0];
    const pokemonSummary = screen.getByText(summary);
    expect(pageTitle).toHaveTextContent(`${name} Details`);
    expect(linksOnThisPage).toHaveLength(numberOfLinks);
    expect(summaryHeading).toBeInTheDocument();
    expect(pokemonSummary).toBeInTheDocument();
  });
});
