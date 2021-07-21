import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando se o FavoritePokemons.', () => {
  it('exibe na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noPokemonsText = screen.getByText('No favorite pokemon found');
    expect(noPokemonsText).toBeInTheDocument();
  });

  it('exibe na tela todos os pokémons favoritados', () => {
    renderWithRouter(<App />);

    let detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    let favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteCheckbox);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);

    detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favoriteCheckbox);

    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const pokemonWeightInfo = screen.getAllByText('Average weight', { exact: false });
    expect(pokemonWeightInfo).toHaveLength(2);
  });
});
