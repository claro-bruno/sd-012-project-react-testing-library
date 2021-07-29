import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import App from '../App';

const moreDetails = 'More details';
// const enteringPokeDetails = screen.getByText(moreDetails);

describe('Verifica se as informações dos pokemons estão corretas', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Verifica se o nome do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonType = screen.getByText('Electric');

    expect(pokemonType).toBeDefined();
  });

  it('Verifica se o tipo do pokémon está correto', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const pokemonName = screen.getByText('Pikachu');

    expect(pokemonName).toBeDefined();
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

describe('Verificações de routers', () => {
  it('Verifica se a URL contém informações do id e um padrão especifico', () => {
    const { history } = renderWithRouter(<App />);
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe('Testes com os pokemóns favoritados', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('Exibe uma estrela ao lado da imagem quando o Pokémon for favoritado', () => {
    const enteringPokeDetails = screen.getByText(moreDetails);
    fireEvent.click(enteringPokeDetails);
    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteLabel);
    const favoriteStar = screen.getByAltText('Pikachu is marked as favorite');

    expect(favoriteStar.src).toBe('http://localhost/star-icon.svg');
  });
});
