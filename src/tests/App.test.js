import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Tests App.js', () => {
  describe('Tests if Home, About and Favorite navigation links exist', () => {
    it('tests if there is a fixed set of links: "Home", "About", "Favorite" ', () => {
      renderWithRouter(<App />);
      const setOfLinks = screen.getAllByRole('link');

      expect(setOfLinks[0]).toHaveTextContent('Home');

      expect(setOfLinks[1]).toHaveTextContent('About');

      expect(setOfLinks[2]).toHaveTextContent('Favorite Pokémons');
    });
  });

  describe('Tests the behavior of links ', () => {
    let history;
    beforeEach(() => {
      history = renderWithRouter(<App />).history;
    });

    it('tests if when clicked it is redirected to Home Page ', () => {
      const linkHome = screen.getByRole('link', { name: 'Home' });
      expect(linkHome.innerHTML).toStrictEqual('Home');

      userEvent.click(linkHome);
      const currentUrl = history.location.pathname;
      expect(currentUrl).toStrictEqual('/');
    });

    it('tests if when clicked it is redirected to About Page', () => {
      const linkAbout = screen.getByRole('link', { name: 'About' });
      expect(linkAbout.innerHTML).toStrictEqual('About');

      userEvent.click(linkAbout);
      const currentUrl = history.location.pathname;
      expect(currentUrl).toStrictEqual('/about');
    });

    it('tests if when clicked it is redirected to Favorite Pokémons Page', () => {
      const linkFavoritPokemons = screen.getByRole('link', { name: /Favorite Pokémons/ });
      expect(linkFavoritPokemons.innerHTML).toStrictEqual('Favorite Pokémons');

      userEvent.click(linkFavoritPokemons);
      const currentUrl = history.location.pathname;
      expect(currentUrl).toStrictEqual('/favorites');
    });
  });
});
