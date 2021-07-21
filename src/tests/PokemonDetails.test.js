import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  it('Testa se ao clicar no link, é redirecionado corretamente', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    expect(moreDetailsLink).not.toBeInTheDocument();
  });

  it('Testa se as informações aparecem corretamente na tela', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/pikachu/i);

    const summaryTitle = screen.getByRole('heading', { name: /summary/i });
    expect(summaryTitle).toBeInTheDocument();

    const pokemonDetail = screen
      .getByText(/This intelligent Pokémon roasts hard berries with electricity/i);
    expect(pokemonDetail).toBeInTheDocument();

    const locationTitle = screen
      .getByRole('heading', { name: /Game Locations of Pikachu/i });
    expect(locationTitle).toBeInTheDocument();

    const maps = screen.getAllByAltText(/pikachu location/i);
    expect(maps).toHaveLength(2);
    expect(maps[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    const mapSub0 = screen.getByText(/Kanto Viridian Forest/i);
    expect(mapSub0).toBeInTheDocument();
    expect(maps[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    const mapSub1 = screen.getByText(/Kanto Power Plant/i);
    expect(mapSub1).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar o pokemon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const checkboxLabel = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checkboxLabel).toBeInTheDocument();

    const checkboxFav = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkboxFav);

    const starFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFav).toBeInTheDocument();

    userEvent.click(checkboxFav);
    expect(starFav).not.toBeInTheDocument();
  });
});
