import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Data from '../data';

describe('Se as informações detalhadas do Pokémon selecionado são mostradas', () => {
  const details = 'More details';
  const linkDetails = 'http://localhost/pokemons/25';

  test('A página deve conter um texto <name> Details', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();
    expect(getLink.href).toBe(linkDetails);

    userEvent.click(getLink);
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(getLink).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();

    const pokeAbs1 = 'This intelligent Pokémon roasts hard berries with';
    const pokeAbs2 = 'electricity to make them tender enough to eat.';
    expect(screen.getByText(`${pokeAbs1} ${pokeAbs2}`)).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas contendo as localizações', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();
    expect(getLink.href).toBe(linkDetails);

    userEvent.click(getLink);
    const gLocation = screen.getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(gLocation).toBeInTheDocument();

    Data.find((poke) => poke.name === 'Pikachu').foundAt.forEach((l, i) => {
      expect(screen.getByText(l.location)).toBeInTheDocument();
      const getImg = screen.getAllByAltText('Pikachu location');
      expect(getImg[i]).toBeInTheDocument();
      expect(getImg[i].src).toBe(l.map);
    });
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const url = history.location.pathname;
    expect(url).toBe('/');

    const getLink = screen.getByRole('link', { name: details });
    expect(getLink).toBeInTheDocument();
    expect(getLink.href).toBe(linkDetails);

    userEvent.click(getLink);
    const getPokeFav = screen.getByLabelText('Pokémon favoritado?');
    expect(getPokeFav).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    userEvent.click(getPokeFav);
    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('http://localhost/star-icon.svg');

    userEvent.click(getPokeFav);
    expect(img).not.toBeInTheDocument();
  });
});
