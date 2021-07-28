import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Verifica o conteúdo do componente Pokemon', () => {
  const stringMoreDetails = 'More details';

  test('Verifica se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(nextPokemonButton).toBeInTheDocument();

      pokemons.forEach((pokemon) => {
        const pokemonName = screen.getByTestId('pokemon-name');
        const pokemonType = screen.getByTestId('pokemon-type');
        const pokemonWeigth = screen.getByTestId('pokemon-weight');
        const pokeWeightValue = pokemon.averageWeight.value;
        const pokeWeightUnit = pokemon.averageWeight.measurementUnit;
        const pokemonImage = screen.getByAltText(`${pokemon.name} sprite`);

        expect(pokemonName).toHaveTextContent(pokemon.name);
        expect(pokemonType).toHaveTextContent(pokemon.type);
        expect(pokemonWeigth).toHaveTextContent(
          `Average weight: ${pokeWeightValue} ${pokeWeightUnit}`,
        );
        expect(pokemonImage).toHaveAttribute('src', pokemon.image);
        userEvent.click(nextPokemonButton);
      });
    });

  test('Testa se o card contém um link de navegação para exibir detalhes deste Pokémon.',
    () => {
      renderWithRouter(<App />);
      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      pokemons.forEach((pokemon) => {
        const pokemonId = pokemon.id;
        const detailsLink = screen.getByRole('link', { name: stringMoreDetails });
        expect(detailsLink).toHaveAttribute('href', `/pokemons/${pokemonId}`);
        userEvent.click(nextPokemonButton);
      });
    });

  test(`Verifica se ao clicar em "More details" redireciona 
  para a página com url correspondente ao id do pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: stringMoreDetails });
    const pokemonId = pokemons[0].id;
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemonId}`);
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: stringMoreDetails });
    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(detailsLink);
    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemon);
    userEvent.click(homeLink);
    const starImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
