import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWhitRouter from './renderWhithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWhitRouter(<App />);
    const firstPkm = pokemons[0];
    const { averageWeight, image, name, type } = firstPkm;
    const { value, measurementUnit } = averageWeight;
    const checkName = screen.getByTestId('pokemon-name');
    expect(checkName).toHaveTextContent(name);

    const checkType = screen.getByTestId('pokemon-type');
    expect(checkType).toHaveTextContent(type);

    const textWeight = `Average weight: ${value} ${measurementUnit}`;
    const checkWeight = screen.getByTestId('pokemon-weight');
    expect(checkWeight).toHaveTextContent(textWeight);

    const checkImage = screen.getByRole('img');
    expect(checkImage.src).toBe(image);
    expect(checkImage.alt).toBe(`${name} sprite`);
  });

  test('Testa se o card contém um link de navegação para exibir detalhes', () => {
    renderWhitRouter(<App />);
    const checkLink = screen.getByRole('link', { name: /More details/i });
    expect(checkLink.href).toMatch(`/pokemons/${pokemons[0].id}`);
    // Usei o toMatch baseada na documentação do Jest: https://jestjs.io/pt-BR/docs/using-matchers
  });

  test('Testa se ao clicar no link é redirecionado para a pág. de detalhes', () => {
    const { history } = renderWhitRouter(<App />);
    expect(history.location.pathname).toBe('/');
    const clickLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(clickLink);
    const { pathname } = history.location;
    expect(pathname).toMatch(`/pokemons/${pokemons[0].id}`);
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWhitRouter(<App />);
    const { name } = pokemons[0];
    const moreDetails = screen.getByText(/More details/i);
    userEvent.click(moreDetails);

    const clickFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(clickFavorite);

    const checkFavorite = screen.getByAltText(/is marked as favorite/i);
    expect(checkFavorite.src).toMatch('/star-icon.svg');
    expect(checkFavorite.alt).toBe(`${name} is marked as favorite`);
  });
});
