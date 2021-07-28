import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWRouter from './RenderWRouter';
import App from '../App';

describe('Testa as funções do componente Pokemon', () => {
  const mockPikachu = {
    name: 'Pikachu',
    type: 'Electric',
    id: 25,
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  };
  test('Checa renderização do card com as informações corretas sobre o pokémon', () => {
    renderWRouter(<App />);
    const { name, type, averageWeight, image } = mockPikachu;
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText(`${name} sprite`);

    expect(pokeName).toHaveTextContent(name);
    expect(pokeType).toHaveTextContent(type);
    expect(pokeWeight)
      .toHaveTextContent(
        `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
      );
    expect(pokeImg.src).toBe(image);
  });
  test('Checa se o card do Pokémon possui o link para mais detalhes', () => {
    renderWRouter(<App />);
    const { name } = mockPikachu;
    const starUrl = 'http://localhost/star-icon.svg';
    const moreDetailsLink = screen.getByRole('link', { name: /More Details/i });

    expect(moreDetailsLink).toBeInTheDocument();
    fireEvent.click(moreDetailsLink);

    const isFavorite = screen.getByRole('checkbox');
    fireEvent.click(isFavorite);

    const estrelinha = screen.getByAltText(`${name} is marked as favorite`);
    expect(estrelinha).toBeInTheDocument();
    expect(estrelinha).toHaveProperty('src', starUrl);

    const home = screen.getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    fireEvent.click(home);

    const estrelinha2 = screen.getByAltText(`${name} is marked as favorite`);
    expect(estrelinha2).toBeInTheDocument();
    expect(estrelinha2).toHaveProperty('src', starUrl);
  });
});
