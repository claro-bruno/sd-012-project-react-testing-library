import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('6 - Teste o componente `<Pokemon.js />', () => {
  test('1- Testa se é renderizado um card com as infos de determinado pokémon', () => {
    renderWithRouter(<App />);
  });
  test('2- Testa se o card do Pokémon indicado na Pokédex contém um link', () => {
    renderWithRouter(<App />);
    const moreDetails = 'More details';
    const enteringPokeDetails = screen.getByText(moreDetails);
    const pokeName = screen.getByText('Pikachu');
    fireEvent.click(enteringPokeDetails);
    const pokeType = screen.getByText('Electric');
    const pokeWeight = screen.getByText('Average weight: 6.0 kg');
    const pokeImage = screen.getByAltText('Pikachu sprite');
    expect(pokeName).toBeDefined();
    expect(pokeType).toBeDefined();
    expect(pokeWeight).toBeDefined();
    expect(pokeImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('3- Teste se ao clicar no link de navegação do Pokémon redireciona', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = 'More details';
    const linkPokeUrl = screen.getByText(moreDetails);
    fireEvent.click(linkPokeUrl);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('4- Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const clickMoreDetails = screen.getByText(/More details/);
    fireEvent.click(clickMoreDetails);
    const checkLabel = screen.getByLabelText(/Pokémon favoritado?/);
    fireEvent.click(checkLabel);
    const star = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
