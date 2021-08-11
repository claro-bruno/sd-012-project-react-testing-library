import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon.js', () => {
  it('testa se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const nextPokemonBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    const detailedInfoLink = screen.getByRole('link', { name: 'More details' });
    pokemons.forEach((pokemon) => {
      const { id, name, type, averageWeight, image } = pokemon;
      const pokemonImage = screen.getByAltText(`${name} sprite`);
      expect(pokemonName).toHaveTextContent(name);
      expect(pokemonType).toHaveTextContent(type);
      expect(pokemonWeight)
        .toHaveTextContent(
          `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
        );
      expect(pokemonImage).toBeInTheDocument();
      expect(pokemonImage.src).toBe(image);
      // Aqui resolvi centralizar o teste, aqui testa se o link leva para a página de detalhes desse pokemon.
      expect(detailedInfoLink.href).toBe(`http://localhost/pokemons/${id}`);
      fireEvent.click(nextPokemonBtn);
    });
  });

  it('testa se ao clicar no link de detalhes do pokemon a página é redirecionada', () => {
    const { history } = renderWithRouter(<App />);
    const detailedInfoLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailedInfoLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('testa se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const detailedInfoLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailedInfoLink);
    expect(history.location.pathname).toBe('/pokemons/25');
    const toFavoritePokemon = screen.getByLabelText('Pokémon favoritado?',
      { selector: 'input' });
    fireEvent.click(toFavoritePokemon);
    const favoritedPokemonImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritedPokemonImage).toBeInTheDocument();
    expect(favoritedPokemonImage.src).toBe('http://localhost/star-icon.svg');
  });
});
