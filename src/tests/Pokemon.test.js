import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
// trecho linha 9 a 15 copiado de victor lopes t10
describe('Testing Pokemon Component, Sixth Requirement', () => {
  describe('Rendering of the card with the information of a certain Pokémon',
    () => {
      const MoreDetails = 'More details';
      it('there is a More Details Link in the App Component', () => {
        renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        userEvent.click(MoreDetailsLink);

        expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
        expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
        expect(screen.getByTestId('pokemon-weight'))
          .toHaveTextContent('Average weight: 6.0 kg');

        expect(screen.getAllByRole('img', {
          name: 'Pikachu sprite',
        })[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      });

      it('there is a star icon on favorite Pokemons and the pathname is correct', () => {
        const { history } = renderWithRouter(<App />);
        const MoreDetailsLink = screen.getByRole('link', {
          name: MoreDetails,
        });

        userEvent.click(MoreDetailsLink);

        const { pathname } = history.location;
        expect(pathname).toBe('/pokemons/25');

        const checkboxFromLabel = screen.getByLabelText('Pokémon favoritado?');

        userEvent.click(checkboxFromLabel);

        expect(screen.getByRole('img', {
          name: 'Pikachu is marked as favorite',
        })).toHaveAttribute('src', '/star-icon.svg');
      });
    });
});
