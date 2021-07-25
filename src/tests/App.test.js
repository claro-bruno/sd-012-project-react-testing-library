import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('[ 1 ] Testa o componente App.js', () => {
  describe('Testa se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      test('O primeiro link deve possuir o texto Home', () => {
        renderWithRouter(<App />);
        const home = screen.getByRole('link', { name: /home/i });
        expect(home).toBeInTheDocument();
      });
      test('O segundo link deve possuir o texto About', () => {
        renderWithRouter(<App />);
        const about = screen.getByRole('link', { name: /about/i });
        expect(about).toBeInTheDocument();
      });
      test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
        renderWithRouter(<App />);
        const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
        expect(favorite).toBeInTheDocument();
      });
    });
  describe('Testa se a aplicação é redirecionada adequadamente',
    () => {
      test('para página inicial ao clicar no link Home da barra de navegação',
        () => {
          const { history } = renderWithRouter(<App />);
          const home = screen.getByRole('link', { name: /home/i });
          fireEvent.click(home);
          expect(history.location.pathname).toEqual('/');
        });
      test('para página de About ao clicar no link About da barra de navegação',
        () => {
          const { history } = renderWithRouter(<App />);
          const about = screen.getByRole('link', { name: /about/i });
          fireEvent.click(about);
          expect(history.location.pathname).toEqual('/about');
        });
      test('para página de Favoritos ao clicar em FavoritePokémons da barra de navegação',
        () => {
          const { history } = renderWithRouter(<App />);
          const favoritePokemons = screen.getByRole('link',
            { name: /favorite pokémons/i });
          fireEvent.click(favoritePokemons);
          expect(history.location.pathname).toEqual('/favorites');
        });
      test('para página Not Found ao entrar em uma URL desconhecida',
        () => {
          const { history } = renderWithRouter(<App />);
          history.push('/url/desconhecida');
          const notFound = screen.getByRole('heading',
            { name: /page requested not found/i });
          expect(notFound).toBeInTheDocument();
        });
    });
});
