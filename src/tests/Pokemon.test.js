import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test if there is a card with info on a specific pokémon',
  () => {
    const moreDetails = 'More Details'; // feito em consulta a Victor Lopes
    it('there is a link to More Details in the App component', () => {
      renderWithRouter(<App />);
      const moreDetailsLink = screen.getByRole('link', {
        name: moreDetails,
      });
      userEvent.click(moreDetailsLink);

      expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
      expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
      expect(screen.getByTestId('pokemon-weight'))
        .toHaveTextContent('Average weight: 6.0 kg');

      expect(screen.getAllByRole('img', {
        name: 'Pikachu sprite',
      })[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    });

    it('has a star icon on favorite pokémons with correspondent pathname', () => {
      const { history } = renderWithRouter(<App />);
      const MoreDetailsLink = screen.getByRole('link', {
        name: MoreDetails,
      });

      userEvent.click(MoreDetailsLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/pokemons/25');

      const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');

      userEvent.click(labelCheckbox);

      expect(screen.getByRole('img', {
        name: 'Pikachu is marked as favorite',
      })).toHaveAttribute('src', '/star-icon.svg');
    });
  });
