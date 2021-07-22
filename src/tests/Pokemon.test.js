import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Verifica se no card do pokémon é mostrada as informações', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const image = screen.getByRole('img');

    expect(pokemonName).toHaveTextContent(/pikachu/i); // quando é testId usa-se textContent
    expect(pokemonType).toHaveTextContent(/electric/i);
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image.alt).toBe('Pikachu sprite');
  });

  it('Verifica se o link do card direciona para a página correta', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeDefined();

    const detailsLink = screen.getByText(/more details/i);
    userEvent.click(detailsLink);
    const { pathname } = history.location; // esse { pathname } precisa ficar embaixo do click

    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se os pokemons favoritados possuem estrela', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const checkFavorite = screen.getByRole('checkbox');
    userEvent.click(checkFavorite);

    const starImg = screen.getAllByRole('img');
    expect(starImg[1].src).toBe('http://localhost/star-icon.svg'); // não sei se pode dar problema
    expect(starImg[1].alt).toBe('Pikachu is marked as favorite');
  });
});
