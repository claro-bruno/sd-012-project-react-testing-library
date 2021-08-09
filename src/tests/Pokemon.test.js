import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa todo o componente Pokemon', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
    expect(screen.getByRole('img', { name: 'Pikachu sprite' }))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Testa se o card contém um details, redireciona e exibe no navegador o id', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText('More details');
    expect(details).toBeInTheDocument();
    const pokemonPath = '/pokemons/25';
    expect(details).toHaveAttribute('href', pokemonPath);
    userEvent.click(details);
    expect(history.location.pathname).toBe(pokemonPath);
  });
  it('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const detUrl = screen.getByText('More details');
    userEvent.click(detUrl);
    const falseCheckbox = screen.getByRole('checkbox', { checked: false });
    expect(falseCheckbox).toBeInTheDocument();
    userEvent.click(falseCheckbox);
    const trueCheckbox = screen.getByRole('checkbox', { checked: true });
    expect(trueCheckbox).toBeInTheDocument();
    const favoriteUrl = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteUrl);
    const favorite = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toContain('/star-icon.svg');
  });
});
