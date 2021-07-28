import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

test('Teste para o nome correto do Pokémon ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const pokeName = screen.getByTestId('pokemon-name').innerHTML;
  expect(pokeName).toBe('Pikachu');
});

test('Teste para o tipo correto do pokémon ser mostrado na tela', () => {
  renderWithRouter(<App />);
  const pokeType = screen.getByTestId('pokemon-type').innerHTML;
  expect(pokeType).toBe('Electric');
});

test('Teste para o peso médio do pokémon ser exibido com um texto', () => {
  renderWithRouter(<App />);
  const pokeWeight = screen.getByTestId('pokemon-weight').innerHTML;
  expect(pokeWeight).toBe('Average weight: 6.0 kg');
});

test('Teste para a imagem do Pokémon ser exibida', () => {
  renderWithRouter(<App />);
  const pokeImg = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(pokeImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Teste `Pokémon card indicado na Pokédex contém link`', () => {
  const { history } = renderWithRouter(<App />);
  const linkToDetails = screen.getByText(/more details/i);
  expect(linkToDetails).toBeInTheDocument();
  expect(linkToDetails).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(linkToDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
  const pokemon = pokemons[0];
  renderWithRouter(<Pokemon isFavorite pokemon={ pokemon } />);
  const starImg = screen.getByAltText('Pikachu is marked as favorite');
  expect(starImg).toHaveAttribute('src', '/star-icon.svg');
});
