import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import RenderWithRouter from './RenderWithRouter';
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
  summary: 'This intelligent Pokémon roasts hard berries with electricity.',
};

describe('Teste do componente Pokemon.js', () => {
  test('Testa se renderiza um card com as info', () => {
    RenderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
      showDetailsLink
    />);

    const getNamePokemon = screen.getByText(/pikachu/i);
    expect(getNamePokemon).toBeInTheDocument();

    const getTypePokemon = screen.getByTestId('pokemon-type');
    expect(getTypePokemon.innerHTML).toEqual('Electric');

    const { averageWeight: { value, measurementUnit } } = pokemon;
    const getWeightPoke = screen.getByTestId('pokemon-weight');
    expect(getWeightPoke.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    const getImg = screen.getByRole('img');
    expect(getImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const { name } = pokemon;
    expect(getImg.alt).toBe(`${name} sprite`);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação'
  + ' para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
  + ' onde <id> é o id do Pokémon exibido', () => {
    RenderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite={ false }
      showDetailsLink
    />);

    const getMoreDetails = screen.getByText(/more details/i);
    const { id } = pokemon;
    expect(getMoreDetails.href).toContain(`pokemons/${id}`);
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + ' da aplicação para a página de detalhes de Pokémon.', () => {
    RenderWithRouter(<App />);

    const getMoreDetails = screen.getByText(/more details/i);
    userEvent.click(getMoreDetails);
    const getDetails = screen.getByText(/pikachu details/i);
    expect(getDetails).toBeInTheDocument();
  });

  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
  + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = RenderWithRouter(<App />);

    const getMoreDetails = screen.getByText(/more details/i);
    userEvent.click(getMoreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    RenderWithRouter(<Pokemon
      pokemon={ pokemon }
      isFavorite
      showDetailsLink
    />);

    const getImg = screen.getAllByRole('img');
    expect(getImg[1].src).toContain('/star-icon.svg');
    const { name } = pokemon;
    expect(getImg[1].alt).toBe(`${name} is marked as favorite`);
  });
});
