import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon.js.', () => {
  it('Verifica se: o card com informações do Pokemon é renderizado.', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const spritePikachu = screen.getByAltText('Pikachu sprite');
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(spritePikachu).toBeInTheDocument();
    expect(spritePikachu).not.toHaveAttribute('src', '');
  });

  it('Verifica se: possui um link para more details.', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByText('More details');
    expect(detailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  it('Verifica se: o link more details está direcionando para o local correto.', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se: existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
