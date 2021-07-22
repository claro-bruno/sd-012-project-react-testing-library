import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe(' Teste o componente <Pokemon.js />', () => {
  const pokemon = pokemons[0];
  const { name, type, averageWeight: { measurementUnit, value } } = pokemon;
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId(/pokemon-weight/i))
      .toHaveTextContent(`Average weight ${value} ${measurementUnit}`);
    const altText = 'Pikachu sprite';
    const image = screen.getByAltText(altText);
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Teste se o card do Pokémon indicado na Pokédex [...]', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se ao clicar no link de navegação do Pokémon [...]', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    userEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado?/i }));
    const altText = 'Pikachu is marked as favorite';
    const image = screen.getByAltText(altText);
    expect(image.src).toBe('http://localhost/star-icon.svg');
  });
});
// Link
// Artur Alvaro o Monstro dos testes me deu um help
// https://github.com/ArturAlvaro
