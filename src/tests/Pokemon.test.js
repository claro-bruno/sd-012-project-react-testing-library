import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testa todo o meu componente Pokemon', () => {
  it('Testa se renderiza um card', () => {
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

  it('Testa se contém o link de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Testa se existe um icone', () => {
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
