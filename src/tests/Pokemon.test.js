import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const imgSrc = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
const pokemonId = 25;

describe('Testa o component Pokemon', () => {
  it('Testa se é renderizado um card', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImage = screen.getByRole('img');
    expect(pokemonImage).toHaveAttribute('src', imgSrc);
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Testa o caminho do link no botão de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const detailsButton = screen.getByText('More details');
    userEvent.click(detailsButton);
    expect(detailsButton).toHaveAttribute('href', `/pokemons/${pokemonId}`);

    const detailsContent = screen.getByText('Pikachu Details');
    expect(detailsContent).toBeInTheDocument();

    const pathName = history.location.pathname;
    expect(pathName).toBe(`/pokemons/${pokemonId}`);
  });

  it('Testa o ícone de estrela', () => {
    renderWithRouter(<App />);

    const detailsButton = screen.getByText('More details');
    userEvent.click(detailsButton);
    const check = screen.getByRole('checkbox');
    expect(check).toBeInTheDocument();
    userEvent.click(check);

    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
