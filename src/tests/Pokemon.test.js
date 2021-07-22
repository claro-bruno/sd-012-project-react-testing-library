import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const details = 'More details';

describe('Testa informações do componente Pokemon.js', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const name = screen.getByTestId('pokemon-name');
      const type = screen.getByTestId('pokemon-type');
      const weight = screen.getByTestId('pokemon-weight');
      const img = screen.getByAltText(`${pokemon.name} sprite`);
      const imgURL = pokemon.image;
      const { value, measurementUnit } = pokemon.averageWeight;
      const link = screen.getByRole('link', { name: details });

      expect(name).toHaveTextContent(pokemon.name);
      expect(type).toHaveTextContent(pokemon.type);
      expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(img).toHaveProperty('src', imgURL);
      expect(link).toHaveProperty('href', `http://localhost/pokemons/${pokemon.id}`);

      userEvent.click(nextPokemon);
    });
  });

  it('Testa se link More details redireciona para página correta', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: details });
    userEvent.click(link);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se imagem de favorito aparece', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: details });

    userEvent.click(link);
    userEvent.click(screen.getByRole('checkbox'));

    const altImg = `${pokemons[0].name} is marked as favorite`;
    const img = screen.getByAltText(altImg);

    expect(img).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
