import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import data from '../data';
import renderWithRouter from './renderWithRouter';
// Codigo de Bruno Yamamoto https://github.com/tryber/sd-012-project-react-testing-library/pull/40/files?file-filters%5B%5D=.js
const pokemonTeste = data[4];

describe('Testa o componente Pokemon', () => {
  it('Renderiza o pokemon corretamente.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTeste } isFavorite={ false } />);

    expect(screen.getByTestId('pokemon-name')).toContainHTML(pokemonTeste.name);
    expect(screen.getByTestId('pokemon-type')).toContainHTML(pokemonTeste.type);

    const { value, measurementUnit } = pokemonTeste.averageWeight;
    const weight = `Average weight: ${value} ${measurementUnit}`;
    expect(screen.getByTestId('pokemon-weight')).toContainHTML(weight);

    const img = screen.getByRole('img', { name: `${pokemonTeste.name} sprite` });
    expect(img).toHaveProperty('src', pokemonTeste.image);
  });

  it('Testa se o pathname funciona corretamente', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTeste } isFavorite={ false } />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    expect(detailsLink).toBeDefined();
    const linkToDetails = `/pokemons/${pokemonTeste.id}`;
    expect(detailsLink.href.endsWith(linkToDetails)).toBeTruthy();
  });

  it('Testa se ao clicar no link é redirecionado para o local correto.', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonTeste }
      isFavorite
      showDetailsLink
    />);
    const linkToDetails = screen.getByText('More details');
    expect(linkToDetails).toBeDefined();
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemonTeste.id}`);
  });

  it('Ver se é o pokemon possui a estrela de favorito', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonTeste } isFavorite showDetailsLink />);
    const altText = `${pokemonTeste.name} is marked as favorite`;
    const favorite = screen.getByRole('img', { name: altText });
    expect(favorite).toBeDefined();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
