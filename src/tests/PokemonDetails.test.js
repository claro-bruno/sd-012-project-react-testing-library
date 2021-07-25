import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// import isPokemonFavoriteById from '../services/isPokemonFavoritById';
import pokemons from '../data';

const details = 'More details';

describe('Test all `Pokemon Details` component', () => {
  test('if contains all details info about pokemon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: details });

    pokemons.forEach((pokemon) => {
      const { id, name, summary, foundAt } = pokemon;
      history.push(`/pokemons/${id}`);

      const url = history.location.pathname;
      const nameHeading = screen.getByRole('heading', { name: `${name} Details` });
      const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
      const summaryText = screen.getByText(summary);
      const habitatHeading = screen.getByRole(
        'heading',
        { name: `Game Locations of ${name}` },
      );

      expect(detailsLink).not.toBeInTheDocument();
      expect(url).toBe(`/pokemons/${id}`);
      expect(nameHeading).toHaveTextContent(name);
      expect(summaryHeading).toBeInTheDocument();
      expect(summaryText).toHaveTextContent(summary);
      expect(habitatHeading).toBeInTheDocument();

      let mapImages;
      if (foundAt.length !== 1) {
        mapImages = screen.getAllByAltText(`${name} location`);

        mapImages.forEach((mapImage, i) => {
          const locationText = screen.getByText(foundAt[i].location);
          expect(locationText).toHaveTextContent(foundAt[i].location);

          expect(mapImage).toBeInTheDocument();
          expect(mapImage).toHaveAttribute('src', foundAt[i].map);
        });
      } else {
        const locationText = screen.getByText(foundAt[0].location);
        expect(locationText).toHaveTextContent(foundAt[0].location);

        mapImages = screen.getByAltText(`${name} location`);
        expect(mapImages).toBeInTheDocument();
        expect(mapImages).toHaveAttribute('src', foundAt[0].map);
      }

      const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
      const favoriteInput = screen.getByRole('checkbox');

      expect(favoriteLabel).toBeInTheDocument();
      expect(favoriteInput.checked).toBe(false);
      fireEvent.click(favoriteInput);
      expect(favoriteInput.checked).toBe(true);
    });
  });
});
