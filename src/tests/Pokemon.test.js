import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testando o componente Pokemon.js.', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const typePokemon = screen.getByTestId('pokemon-type');
    const namePokemon = screen.getByTestId('pokemon-name');
    const spritePikachu = screen.getByAltText('Pikachu sprite');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(namePokemon).toHaveTextContent('Pikachu');
    expect(spritePikachu).toBeInTheDocument();
    expect(spritePikachu).not.toHaveAttribute('src', '');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Teste se o card do Pokémon contém um link para exibir detalhes', () => {
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

  it('Teste se existe um ícone de estrela nos Pokémons favoritados ', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/More details/));
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
