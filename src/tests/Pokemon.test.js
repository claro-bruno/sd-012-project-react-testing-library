import React from 'react';
import { getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testes para o componente Pokemon', () => {
  beforeEach(() => {
    
  });
  it('Testa se os dados do pokemon aparecem no card', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink
        isFavorite
      />,
    );
    const { averageWeight, image, name} = pokemons[0];
    const { measurementUnit, value } = averageWeight;
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImage = screen.getByAltText(`${name} sprite`);
    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`)
    expect(pokeImage).toHaveAttribute('src', image);
  });

  it('Testa se o card possui um link para detalhes do pokemon e ao clicar leva a pagina de detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink
        isFavorite
      />,
    );
    const pokeDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokeDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Testa se existe um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        showDetailsLink
        isFavorite
      />,
    );
    const favIcon = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
