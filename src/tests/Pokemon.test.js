import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente <Pokemon.js />', () => {
  it('Renderiza card com informações do Pokémon', () => {
    renderWithRouter(<App />);

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toHaveTextContent('Pikachu');

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');

    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toHaveTextContent('Average weight: 6.0 kg');

    const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('exibir detalhes deste Pokémon', () => {
    renderWithRouter(<App />);

    const detail = screen.getByRole('link', { name: /More details/i });
    expect(detail.href).toBe('http://localhost/pokemons/25');
  });

  it('Clicar no link redireciona para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Existe um ícone de estrela', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);

    const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(checkbox);
    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img.src).toBe('http://localhost/star-icon.svg');
    expect(img.alt).toBe('Pikachu is marked as favorite');
  });
});
