import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se as informações dos pokemons estão corretas', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const moreDetails = 'More details';

  it('Verifica se o tipo do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeDefined();
  });
  it('Verifica se o nome do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonType = screen.getByText('Electric');
    expect(pokemonType).toBeDefined();
  });
  it('Verifica se o peso do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeDefined();
  });
  it('Verifica se a imagem do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});

describe('Verificações a respeito do rotaemento ', () => {
  const moreDetails = 'More details';

  it('Verifica se a URL contém informações do id e um padrão especifico', () => {
    const { history } = renderWithRouter(<App />);
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Testes em torno de pokemóns favoritados', () => {});
