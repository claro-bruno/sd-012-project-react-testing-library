import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('', () => {
  it('Testando se renderiza texto sem nenhum Pokemon', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem do Pikachu', () => {
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
    const pokemons = screen.getAllByRole('img');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[1]).toHaveAttribute('class', 'favorite-icon');
  });
  // O repositório do Luis Seixas me ajudou a entender como testar os pokemons favoritados através das imagens: https://github.com/tryber/sd-012-project-react-testing-library/pull/145/files
});
