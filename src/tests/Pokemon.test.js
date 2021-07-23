import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const { name, image, id } = pokemons[0];
const { value, measurementUnit } = pokemons[0].averageWeight;
const moreDetails = 'More details';

describe('Testa o componente Pokemon', () => {
  afterEach(cleanup);
  it('Testa se o nome correto do Pokémon está sendo mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
  });

  it('Testa se o tipo correto do pokémon é mostrado na tela', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
  });

  it('Testa se o peso do pokémon está sendo mostrado de forma correta', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  });

  it('Testa a imagem do pokémon e seus atributos', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const pokemonImg = screen.getByAltText(`${name} sprite`);
    expect(pokemonImg).toHaveProperty('src', image);
    expect(pokemonImg).toBeInTheDocument();
  });

  it('Testa se o card do pokemon possui um link para mais detalhes', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const link = screen.getByRole('link', { name: moreDetails });
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Testa se ao clicar no link de navegação é feito o direcionamento', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: moreDetails });
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Testa se existe um ícone de acordo com src determinado', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const starImg = screen.getByAltText(`${name} is marked as favorite`);
    const iconPath = 'http://localhost/star-icon.svg';
    expect(starImg).toHaveProperty('src', iconPath);
  });

  it('Testa se a imagem tem uma imagem com o atributo alt determinado', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const starImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(starImg).toHaveProperty('alt', `${name} is marked as favorite`);
  });
});
