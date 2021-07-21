import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWhitRouter from './renderWhithRouter';
import App from '../App';

describe('Testa se existem 3 links ordenados no nav que direcionam para outras páginas',
  () => {
    test('Testa se Home direciona para pathname:/', () => {
      const { history } = renderWhitRouter(<App />);
      const linkToHome = screen.getAllByRole('link')[0];
      expect(linkToHome.textContent).toBe('Home');
      expect(linkToHome).toBeInTheDocument();
      userEvent.click(linkToHome);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    test('Testa se About direciona para pathname:/about', () => {
      const { history } = renderWhitRouter(<App />);
      const linkToAbout = screen.getAllByRole('link')[1];
      expect(linkToAbout.textContent).toBe('About');
      expect(linkToAbout).toBeInTheDocument();
      userEvent.click(linkToAbout);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    test('Testa se Favorite Pokémons direciona para pathname:/favorites', () => {
      const { history } = renderWhitRouter(<App />);
      const linkToFavorite = screen.getAllByRole('link')[2];
      expect(linkToFavorite.textContent).toBe('Favorite Pokémons');
      expect(linkToFavorite).toBeInTheDocument();
      userEvent.click(linkToFavorite);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });
  });

test('Testa se ao entrar em uma URL desconhecida é redirecionado para a página Not Found',
  () => {
    const { history } = renderWhitRouter(<App />);
    history.push('pagina-not-found');
    const NotFound = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(NotFound).toBeDefined();
  });
