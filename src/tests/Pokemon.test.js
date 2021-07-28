import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemon from '../data';

describe('Testa componente Pokémon', () => {
  beforeEach(() => {
    renderWithRouter(<Pokemon pokemon={ pokemon[0] } isFavorite />);
  });

  const { id, name, type, averageWeight, image } = pokemon[0];
  const { value, measurementUnit } = averageWeight;

  test('Testa se renderiza um card com as informações do pokemon', () => {
    const namePok = screen.getAllByText(name);
    expect(namePok).toBeDefined();
    const typePok = screen.getAllByText(type);
    expect(typePok).toBeDefined();
    const weightPok = screen.getAllByText(`Average weight: ${value} ${measurementUnit}`);
    expect(weightPok).toBeDefined();
    const srcImg = screen.getAllByRole('img');
    expect(srcImg[0]).toHaveAttribute('src', image);
    expect(srcImg[0]).toHaveAttribute('alt', `${pokemon[0].name} sprite`);
  });

  test('Testa se há um link de navegação para mais detalhes', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon[0] }
        isFavorite={ false }
        showDetailsLink
      />,
    );
    const details = screen.getAllByText(/more details/i)[1];
    expect(details).toBeDefined();
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Testa se pokemon está favoritado', () => {
    const favImage = screen.getAllByRole('img')[1];
    expect(favImage).toHaveAttribute('src', '/star-icon.svg');
    expect(favImage).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
