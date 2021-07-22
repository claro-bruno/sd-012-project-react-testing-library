import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const firstImgUrl = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
const secondImgUrl = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
const altImg = 'Pikachu location';
const moreDetailsLink = 'More details';

describe('Testa o componente Pokemon details', () => {
  it('Testa de as informações detalhadas do pokemon são mostradas', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByText(moreDetailsLink);
    userEvent.click(detailsButton);

    const detailsTitle = screen.getByText('Pikachu Details');
    expect(detailsTitle).toBeDefined();
    expect(detailsButton).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const abstract = screen.getByText(/roasts hard berries with electricity/i);
    expect(abstract).toBeDefined();
  });

  it('Testa se existe uma seção com os mapas das localizações', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByText(moreDetailsLink);
    userEvent.click(detailsButton);

    const locationTitle = screen.getByRole(
      'heading', { name: 'Game Locations of Pikachu' },
    );
    expect(locationTitle).toBeDefined();

    const allImgs = screen.getAllByAltText(altImg);
    expect(allImgs.length).toBe(2);
    const firstImgName = screen.getByText('Kanto Viridian Forest');
    const secondImgName = screen.getByText('Kanto Viridian Forest');
    expect(firstImgName).toBeInTheDocument();
    expect(secondImgName).toBeInTheDocument();
    expect(allImgs[0]).toHaveAttribute('src', firstImgUrl);
    expect(allImgs[1]).toHaveAttribute('src', secondImgUrl);
    expect(allImgs[0]).toHaveAttribute('alt', altImg);
    expect(allImgs[1]).toHaveAttribute('alt', altImg);
  });

  it('Testa de o usuário pode favoritar o pokmeon', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByText(moreDetailsLink);
    userEvent.click(detailsButton);

    const textLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(textLabel).toBeInTheDocument();

    const favoritePokemon = screen.getByRole('checkbox');
    expect(favoritePokemon).toBeInTheDocument();

    userEvent.click(favoritePokemon);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
  });
});
