import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
  });
  it('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const detailsText = screen.getByRole('heading', {
      level: 2, name: 'Pikachu Details' });
    expect(detailsText).toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();

    const noLinkDetails = screen.queryByRole('link', { name: /more details/i });
    expect(noLinkDetails).not.toBeInTheDocument();

    const summaryText = /This intelligent Pokémon roasts hard berries with/i;
    const summary = screen.getByText(summaryText);
    expect(summary).toBeInTheDocument();
  });
  it('se tem uma seção com os mapas contendo as localizações do pokémon', () => {
    const { foundAt } = pokemons[0];
    const gameLocation = screen.getByRole('heading', {
      level: 2, name: 'Game Locations of Pikachu' });
    expect(gameLocation).toBeInTheDocument();
    const imageLocation = screen.queryAllByRole('img', { name: 'Pikachu location' });
    expect(imageLocation).toHaveLength(2);

    const locationName0 = screen.getByText(foundAt[0].location);
    const locationName1 = screen.getByText(foundAt[1].location);
    expect(locationName0).toBeInTheDocument();
    expect(locationName1).toBeInTheDocument();

    expect(imageLocation[0]).toHaveAttribute('src', foundAt[0].map);
    expect(imageLocation[1]).toHaveAttribute('src', foundAt[1].map);
  });
  it('se pode favoritar um pokémon através da página de detalhes', () => {
    const favoriteLabel = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });

    expect(favoriteLabel).toBeInTheDocument();
    expect(favoriteLabel.checked).toEqual(false);
    userEvent.click(favoriteLabel);
    expect(favoriteLabel.checked).toEqual(true);
  });
});
