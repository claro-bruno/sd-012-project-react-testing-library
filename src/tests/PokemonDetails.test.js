import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testing PokemonDetails Component, Seventh Requirement', () => {
  describe('Detailed information for the selected Pokémon is shown on the screen',
    () => {
      const MoreDetails = 'More details';
      it('there is a More Details Link in the App Component', () => {
        renderWithRouter(<App />);

        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        expect(MoreDetailsLink).toBeInTheDocument();
      });

      it('the user is redirected to Pokemons Details screen', () => {
        const { history } = renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        expect(MoreDetailsLink).toBeInTheDocument();

        userEvent.click(MoreDetailsLink);

        const { pathname } = history.location;

        expect(pathname).toBe('/pokemons/25');
      });

      it('detailed information for the selected Pokémon is shown on the screen', () => {
        const { history } = renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        expect(MoreDetailsLink).toBeInTheDocument();

        userEvent.click(MoreDetailsLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/pokemons/25');

        expect(screen.getByRole('heading', {
          level: 2,
          name: 'Pikachu Details',
        })).toBeInTheDocument();

        expect(MoreDetailsLink).not.toBeInTheDocument();

        expect(screen.getByRole('heading', {
          level: 2,
          name: 'Summary',
        }));

        expect(screen.getByText(/This intelligent Pokémon/));
      });
    });
  describe('Section on the page with maps containing the locations of the pokémon',
    () => {
      const MoreDetails = 'More details';
      it('details should have a heading h2 with right text and the image maps', () => {
        renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        userEvent.click(MoreDetailsLink);

        expect(screen.getByRole('heading', {
          level: 2,
          name: 'Game Locations of Pikachu',
        }));

        expect(screen.getAllByRole('img', { // 80-87 trecho copiado de victor lopes
          name: 'Pikachu location',
        })[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

        expect(screen.getAllByRole('img', {
          name: 'Pikachu location',
        })[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
      });

      it('details should have a checkbox with the right text', () => {
        renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        userEvent.click(MoreDetailsLink);

        const checkboxFromRole = screen.getByRole('checkbox', {
          name: 'Pokémon favoritado?',
        });

        const checkboxFromLabel = screen.getByLabelText('Pokémon favoritado?');

        expect(checkboxFromRole).toBe(checkboxFromLabel);
        expect(checkboxFromRole).toBeInTheDocument();
      });
    });
});
