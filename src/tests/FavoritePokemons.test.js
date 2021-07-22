import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('este se é exibido na tela a mensagem No favorite pokemon found, '
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const parag = screen.getByText('No favorite pokemon found');
    expect(parag).toBeDefined();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    pokemons.forEach((pokemon, index) => {
      const detailsLink = screen.getByText(/More details/i);
      fireEvent.click(detailsLink);
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      history.push('/');
      const nextPkmn = screen.getByRole('button', { name: 'Próximo pokémon' });
      for (let i = 0; i <= index; i += 1) {
        fireEvent.click(nextPkmn);
      }
    });

    const links = screen.getAllByRole('link');
    const favLink = links[2];
    fireEvent.click(favLink);

    pokemons.forEach((pokemon) => {
      const { name } = pokemon;
      const nameEl = screen.getByText(name);
      expect(nameEl).toBeInTheDocument();
    });
  });
});
