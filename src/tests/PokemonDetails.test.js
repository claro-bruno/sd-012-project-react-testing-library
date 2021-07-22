import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
// import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

const summaryText1 = 'This intelligent Pokémon roasts hard berries ';
const summaryText2 = 'with electricity to make them tender enough to eat.';

const summaryText = `${summaryText1}${summaryText2}`;

const moreDetailsString = 'More details';

const pokemonSample = {
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
  summary: summaryText,
};

describe('Check if Pokemon.js is working as it should', () => {
  afterEach(cleanup);

  it('Check if pokemon card is displayed with correct info"', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsString });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const pokemonTitle = screen.getByText(`${pokemonSample.name} Details`);
    expect(pokemonTitle).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByText('Summary');
    expect(summary).toBeInTheDocument();
    expect(summary.tagName).toBe('H2');
    const details = screen.getByText(pokemonSample.summary);
    expect(details).toBeInTheDocument();
  });
  it('Check if the section of map and location exists', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsString });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const detailsHeading = screen.getByText(`Game Locations of ${pokemonSample.name}`);
    expect(detailsHeading).toBeInTheDocument();
    const locations = screen
      .getAllByRole('img', { name: `${pokemonSample.name} location` });
    expect(locations.length).toBe(pokemonSample.foundAt.length);
    pokemonSample.foundAt.forEach((location) => {
      const locationText = screen.getByText(location.location);
      expect(locationText).toBeInTheDocument();
      const locationImg = screen.getAllByRole('img');
      const rightImg = locationImg.find((img) => img.src === location.map);
      expect(rightImg).toBeInTheDocument();
    });
  });
  it('Check if the user can add a pokemon to favorites', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: moreDetailsString });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favImg = screen
      .getByRole('img', { name: `${pokemonSample.name} is marked as favorite` });
    expect(favImg).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favImg).not.toBeInTheDocument();
    userEvent.click(checkbox);
  });
});
