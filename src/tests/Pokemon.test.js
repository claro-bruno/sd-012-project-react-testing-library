import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard...',
};

describe('Testa o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App pokemon={ pokemon } />);
  });
  test('Testa renderização de um card com informações de um pokémon', () => {
    const name = screen.getByTestId('pokemon-name');
    expect(name.innerHTML).toBe('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');
    const image = screen.getByRole('img', { alt: 'Pikachu sprite' });
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Testa se há um link de navegação', () => {
    const details = screen.getByRole('link', {
      name: /More Details/i,
    });
    expect(details.href).toContain('/pokemons/25');
    fireEvent.click(details);
  });
  test('Testa se URL muda para ID', () => {
    const details = screen.getByRole('link', {
      name: /More Details/i,
    });
    expect(`${details}25`).toContain('/pokemons/25');
    fireEvent.click(details);
  });
  test('Testa se existe ícone de estrela nos favoritados', () => {
    const details = screen.getByRole('link', {
      name: /More Details/i,
    });
    fireEvent.click(details);
    expect(details.href).toContain('/pokemons/');
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const starImage = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
      src: '/star-icon.svg',
    });
    expect(starImage.src).toContain('/star-icon.svg');
    const pokeImage = screen.getByRole('img', {
      name: 'Pikachu sprite',
    });
    expect(pokeImage).toBeInTheDocument();
  });
});
