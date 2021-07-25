import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toBe('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe('Electric');

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');

    const pokeImage = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokeImage).toBeInTheDocument();
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: 'More details' });
    expect(detailLink).toBeInTheDocument();

    userEvent.click(detailLink);
    expect(detailLink.href).toContain('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const detailLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailLink);
    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);
    expect(favoriteCheck).toBeChecked();
    const favoriteImg = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
      src: '/star-icon.svg',
    });
    expect(favoriteImg.src).toContain('/star-icon.svg');
  });
});
