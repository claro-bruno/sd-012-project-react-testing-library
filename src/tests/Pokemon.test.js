import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa o component Pokemon', () => {
  test('Testa se um card de pokemon com as informções corretas é renderizado', () => {
    renderWithRouter(<App />);
    const nextPk = screen.getByRole('button', { name: /Próximo pokémon/i });
    pokemons.forEach((pk) => {
      const namePk = screen.getByTestId('pokemon-name');
      expect(namePk).toHaveTextContent(pk.name);

      const typePk = screen.getByTestId('pokemon-type');
      expect(typePk).toHaveTextContent(pk.type);

      const { averageWeight } = pk;
      const weightPk = screen.getByTestId('pokemon-weight');
      const { value, measurementUnit } = averageWeight;
      const txt = `Average weight: ${value} ${measurementUnit}`;
      expect(weightPk).toHaveTextContent(txt);

      const imgSRC = pk.image;
      const imgPk = screen.getByRole('img', { name: `${pk.name} sprite` });
      expect(imgPk).toBeDefined();
      expect(imgPk.src).toBe(imgSRC);

      userEvent.click(nextPk);
    });
  });

  test('Testa se o card contém o link de detalhes de acordo com o ID do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Testa se existe um icone de estrela no pokemon favoritado', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const favCheck = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favCheck);
    expect(favCheck).toBeChecked();
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    const starImg = '/star-icon.svg';
    const favImg = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
    expect(favImg.src).toBe(`http://localhost${starImg}`);
  });
});
