import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  it('Testa se existe um card com detalhes do pokemon', () => {
    renderWithRouter(<App />);
    const nextbutton = screen.getByRole('button', { name: /próximo pokémon/i });
    pokemons.forEach((event) => {
      const namePokemon = screen.getByTestId('pokemon-name');
      expect(namePokemon).toHaveTextContent(event.name);
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(typePokemon).toHaveTextContent(event.type);
      const { averageWeight } = event;
      const weigthPokemon = screen.getByTestId('pokemon-weight');
      const { value, measurementUnit } = averageWeight;
      const txt = `Average weight: ${value} ${measurementUnit}`;
      expect(weigthPokemon).toHaveTextContent(txt);
      const imageSource = event.image;
      const imagePokemon = screen.getByRole('img', { name: `${event.name} sprite` });
      expect(imagePokemon).toBeInTheDocument();
      expect(imagePokemon.src).toBe(imageSource);

      userEvent.click(nextbutton);
    });
  });

  it('Testa o link de navegação de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });
  it('Testa icone de estrela dos favoritados', () => {
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
