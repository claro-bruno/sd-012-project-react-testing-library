import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <Pokemon/>', () => {
  test('Testa se os elementos do pokemon aparecem', () => {
    renderWithRouter(<App />);

    const IMG_LINK = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonName = screen.getByText('Pikachu');
    const pokemonType = screen.getAllByText('Electric');
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    const pokemonImgAlt = screen.getByAltText('Pikachu sprite');

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType[0]).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImgAlt).toBeInTheDocument();
    expect(pokemonImgAlt.src).toBe(IMG_LINK);
  });

  test('Testa se vai para os detalhes e se favoritado aparece', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonDetails).toBeInTheDocument();
    fireEvent.click(pokemonDetails);
    const pokemonDetailsHeader = screen.getByText('Pikachu Details');
    const pathName = history.location.pathname;
    expect(pokemonDetailsHeader).toBeInTheDocument();
    expect(pathName).toBe('/pokemons/25');
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkbox);
    const starAlt = screen.getByAltText('Pikachu is marked as favorite');
    expect(starAlt).toBeInTheDocument();
    expect(starAlt.src).toBe('http://localhost/star-icon.svg');
  });
});
