import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter.js';

describe('Teste o componente <Pokemon.js />', () => {
  const poke = {
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
  };

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { getByText, getByRole, getByTestId } = renderWithRouter(<App />);
    const details = getByText(/More details/i);
    const name = getByText(/Pikachu/i);
    const type = getByTestId('pokemon-type');
    const weight = getByTestId('pokemon-weight').innerHTML;
    console.log(weight.textContent);
    const image = getByRole('img');

    fireEvent.click(details);
    const average = `${poke.averageWeight.value} ${poke.averageWeight.measurementUnit}`;
    expect(name.textContent).toMatch(poke.name);
    expect(type.textContent).toMatch(poke.type);
    expect(weight).toMatch(`Average weight: ${average}`);
    expect(image.src).toContain(poke.image);
    expect(image.alt).toContain(`${poke.name} sprite`);
  });

  it('Contém um Link de navegação correto do id pokemon', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    const poisonBtn = getByRole('button', { name: /poison/i });
    fireEvent.click(poisonBtn);

    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);

    const URL = '/pokemons/23';
    expect(history.location.pathname).toBe(URL);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const poisonBtn = getByRole('button', { name: /poison/i });
    fireEvent.click(poisonBtn);

    const link = getByRole('link', { name: /More details/i });
    fireEvent.click(link);

    const favorites = getByRole('checkbox');
    fireEvent.click(favorites);

    const image = getAllByRole('img');
    expect(image[1].src).toContain('star-icon.svg');
    expect(image[1].alt).toContain('Ekans is marked as favorite');
  });
});
