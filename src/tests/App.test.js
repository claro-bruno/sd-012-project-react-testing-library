import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('1 - Test component App',
  () => {
    it('1.1 - Verify funcionality of Home element', () => {
      const { history } = renderWithRouter(<App />);
      const homeElement = screen.getByText(/Home/i);
      expect(homeElement).toBeInTheDocument();
      fireEvent.click(homeElement);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    it('1.2 - Verify funcionality of About element', () => {
      const { history } = renderWithRouter(<App />);
      const aboutElement = screen.getByText(/About/i);
      expect(aboutElement).toBeInTheDocument();
      fireEvent.click(aboutElement);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    it('1.3 - Verify funcionality of Favorite Pokémons element', () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemonsElement = screen.getByText(/Favorite Pokémons/i);
      expect(favoritePokemonsElement).toBeInTheDocument();
      fireEvent.click(favoritePokemonsElement);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    it('1.4 - Verify if Not Found component works when a URL is unknown', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/notfound');
      const notFoundPage = screen.getByText(/page requested not found/i);
      expect(notFoundPage).toBeInTheDocument();
    });
  });
