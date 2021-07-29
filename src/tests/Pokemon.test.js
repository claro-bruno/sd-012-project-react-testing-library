import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

const mockPokemon = pokemons[2];

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } showDetailsLink isFavorite />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const { value, measurementUnit } = mockPokemon.averageWeight;
    const Img = screen.getByAltText(`${mockPokemon.name} sprite`);
    const details = screen.getByText(/more details/i);
    const imageURL = 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png';
    const weightInfo = `Average weight: ${value} ${measurementUnit}`;

    expect(name).toHaveTextContent(mockPokemon.name);
    expect(type).toHaveTextContent(mockPokemon.type);
    expect(weight).toHaveTextContent(weightInfo);
    expect(Img.src).toBe(imageURL);
    expect(details).toBeInTheDocument();
  });

  test('Teste os links', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite={ false }
      />,
    );
    const details = screen.getByText(/more details/i);

    expect(history.location.pathname).toBe('/');

    fireEvent.click(details);
    expect(history.location.pathname).toBe(`/pokemons/${mockPokemon.id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ mockPokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const star = screen.getByAltText(`${mockPokemon.name} is marked as favorite`);

    expect(star).toBeInTheDocument();
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
