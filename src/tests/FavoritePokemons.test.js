import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

const detailsAlakazam = '/pokemons/65';
const detailsDragonair = '/pokemons/148';

describe('Testa componente FavoritePokemons', () => {
  it(`Verifica se é exibido na tela a mensagem No favorite pokemon found, se a pessoa
  não tiver pokémons favoritos.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('Verifica se todos os cards de pokemons favoritados são exibidos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(detailsAlakazam);

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));

    history.push(detailsDragonair);

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));

    history.push('/favorites');

    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
  });
});
