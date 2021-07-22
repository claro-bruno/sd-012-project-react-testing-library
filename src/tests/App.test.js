import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWRouter from './RenderWRouter';

describe('Avalia o comportamento da app page', () => {
  test('Verifica se o primeiro link redireciona para a página principal', () => {
    const { history } = renderWRouter(<App />);
    const homePageLink = screen.getByRole('link', { name: /Home/i });

    expect(homePageLink).toBeInTheDocument();
    userEvent.click(homePageLink);
    expect(history.location.pathname).toBe('/');
  });
  test('Verifica se o segundo link redireciona para a página About', () => {
    const { history } = renderWRouter(<App />);
    const aboutPageLink = screen.getByRole('link', { name: /About/i });

    expect(aboutPageLink).toBeInTheDocument();
    userEvent.click(aboutPageLink);
    expect(history.location.pathname).toBe('/about');
  });
  test('Verifica se o terceiro link leva à página de pokémons favoritos', () => {
    const { history } = renderWRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(favoritePokemonLink).toBeInTheDocument();
    userEvent.click(favoritePokemonLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
