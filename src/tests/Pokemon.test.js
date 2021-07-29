import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter.test';

// Esse requisito eu fiz agora verificando os PRs do Elias Forte e da Adriana Bibergue
// e entendendo a forma diferente que cada um fez consegui pensar e criar mesclando com as ideias
// Confesso que achei bemmmmmm dificil.
describe('Teste o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pikachu = pokemons[0];
    const { averageWeight, image, name, type } = pikachu;
    const { value, measurementUnit } = averageWeight;
    const Button = screen.getByRole('button', { name: /Electric/i });
    userEvent.click(Button);

    const getNamePokemon = screen.getByTestId(/pokemon-name/i);
    expect(getNamePokemon).toHaveTextContent(/pikachu/i);

    const powerType = screen.getByTestId('pokemon-type');
    expect(powerType).toHaveTextContent(type);

    const getAverageWeigth = screen.getByTestId(/pokemon-weight/i);
    expect(getAverageWeigth)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    const getImage = screen.getByRole('img');
    expect(getImage.src).toBe(image);
    expect(getImage.alt).toBe(`${name} sprite`);
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { history } = renderWithRouter(<App />);

    const linkToDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToDetails).toBeInTheDocument();
    userEvent.click(linkToDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const clickDetails = screen.getByText(/more details/i);
    userEvent.click(clickDetails);

    const clickFavorite = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(clickFavorite);
    const verifyFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(verifyFavorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
