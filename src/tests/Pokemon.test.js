import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokemon.js', () => {
  test('Verificando se o nome correto do Pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);
    const cardPokemon = screen.getByTestId('pokemon-name');
    expect(cardPokemon).toBeInTheDocument();
  });

  test('Verificando se o tipo correto do Pokémon é mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
  });

  test('Verificando o peso médio do pokémon e sua unidade de medida', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('Verificando a imagem do pokémon', () => {
    renderWithRouter(<App />);
    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Verificando se o card indicado contém um link para exibir detalhes', () => {
    renderWithRouter(<App />);
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonDetails).toBeInTheDocument();
  });

  test('Verificando se o link redireciona para a URL correta', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const { name, id } = pokemons[0];
    const pokemonStars = screen.getByRole('link', { name: /More details/i });
    userEvent.click(pokemonStars);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
    const favoriteP = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriteP);
    const pokemonHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(pokemonHome);
    const pokemonData = screen.getByAltText(`${name} is marked as favorite`);
    expect(pokemonData.src).toContain('/star-icon.svg');
  });
});
