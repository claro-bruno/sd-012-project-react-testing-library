import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa funcionamento do componente "Pokemon"', () => {
  const pokemons = {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };
  const { id, name, type, averageWeight, image } = pokemons;
  const { value, measurementUnit } = averageWeight;
  describe('Testa se e renderizado card com informaçoes de determinado pokemon', () => {
    it('O nome correto do Pokemon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokemonName = screen.getByTestId('pokemon-name');
      expect(pokemonName).toHaveTextContent(name);
    });
    it('O tipo correto do Pokemon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokemonType = screen.getByTestId('pokemon-type');
      expect(pokemonType).toHaveTextContent(type);
    });
    it('O peso correto do Pokemon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokeWeight = screen.getByTestId('pokemon-weight');
      expect(pokeWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });
    it('A imagem correta do Pokemon deve ser mostrado na tela', () => {
      renderWithRouter(<App />);
      const pokeimg = screen.getByAltText(`${name} sprite`);
      expect(pokeimg).toHaveProperty('src', image);
      expect(pokeimg).toHaveProperty('alt', `${name} sprite`);
    });
  });
  it('Testa se contem um link de navegação para exibir detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const findDetails = screen.getByText('More details');
    expect(findDetails).toBeInTheDocument();
    userEvent.click(findDetails);
    const pathDetails = history.location.pathname;
    expect(pathDetails).toBe(`/pokemons/${id}`);
  });
  it('Testa', () => {
    renderWithRouter(<App />);
    const findDetails = screen.getByText('More details');
    expect(findDetails).toBeInTheDocument();
    userEvent.click(findDetails);
    const findlabel = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(findlabel);
    const findStar = screen.getByAltText(`${name} is marked as favorite`);
    expect(findStar).toHaveProperty('src', 'http://localhost/star-icon.svg');
    expect(findStar).toHaveProperty('alt', `${name} is marked as favorite`);
  });
});
