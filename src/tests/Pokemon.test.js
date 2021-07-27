import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
// import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  // pokemon que será usado como mock para os testes
  const pokemonPikachu = {
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
    summary: `This intelligent Pokémon roasts hard berries with electricity to make 
    them tender enough to eat.`,
  };

  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonPikachu } isFavorite />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weig = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText('Pikachu sprite');

    expect(name.textContent).toBe('Pikachu');
    expect(type.textContent).toBe('Electric');
    expect(weig.textContent).toBe('Average weight: 6.0 kg');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it(`Teste se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste Pokémon.
  O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonPikachu }
      isFavorite
    />);
    const linkDetails = screen.getByText('More details');
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25'); // id do pikachu
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonPikachu } isFavorite />);
    const favorite = screen.getByAltText('Pikachu is marked as favorite');

    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
  });
});
