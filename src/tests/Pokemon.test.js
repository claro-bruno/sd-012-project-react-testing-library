import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBe('Pikachu');
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBe('Electric');
  });

  test('O peso médio deve ser exibido com um texto no formato Average weight', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight)
      .toHaveTextContent('Average weight: 6.0 kg');
  });

  test('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Teste se é feito o redirecionamento p/ página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(/More details/i);
    userEvent.click(moreDetailsLink);
    const isChecked = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(isChecked);
    const starIcon = screen.getAllByRole('img');
    expect(starIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(starIcon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
