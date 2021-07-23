import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import mockPokemon from '../../mocks/mockPokemon';
import mockFavArray from '../../mocks/mockFavArray';

const { averageWeight, id, image, name, type } = mockPokemon[0];

// prettier-ignore
describe('Requisito 6', () => {
  beforeEach(() => renderWithRouter(
    <Pokedex
      pokemons={ mockPokemon }
      isPokemonFavoriteById={ mockFavArray }
    />,
  ));
  it('6.1 - Teste se é renderizado um card com as informações de pokémon.', () => {
    const info = screen.getByText(/Snorlax/i);
    expect(info).toBeInTheDocument();
  });
  it('6.1.1 - O nome correto do Pokémon deve ser mostrado na tela.', () => {
    const pokemonName = screen.getByText(name);
    expect(pokemonName).toBeInTheDocument();
  });
  it('6.1.2 - O tipo correto do pokémon deve ser mostrado na tela.', () => {
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(type);
  });
  it('6.1.3 - O peso médio do pokémon deve ser exibido.', () => {
    const pokemonWeigth = screen.getByText(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokemonWeigth).toBeInTheDocument();
  });
  it('6.1.4 - A imagem do Pokémon deve ser exibida..', () => {
    const pokemonImage = screen.getByRole('img');
    const altImage = screen.getByAltText(`${name} sprite`);
    expect(pokemonImage).toHaveAttribute('src', image);
    expect(altImage).toBeInTheDocument();
  });
  it('6.2 - Teste se o card do Pokémon indicado na Pokédex contém um link.', () => {
    const detailsLink = screen.getByRole('link', { name: /details/i });
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
  });
  it('6.5 - Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteBtn = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteBtn);
    expect(favoriteBtn).toBeChecked();
    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
