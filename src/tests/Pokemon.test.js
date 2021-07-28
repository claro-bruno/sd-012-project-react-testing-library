import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

beforeEach(() => {
  renderWithRouter(<App />);
});

const pokemonPos = pokemons[0];
const { value, measurementUnit } = pokemonPos.averageWeight;
const average = `Average weight: ${value} ${measurementUnit}`;
const image = `${pokemonPos.name} sprite`;
const favorite = `${pokemonPos.name} is marked as favorite`;

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemonPos.name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokemonPos.type);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(average);

    const images = screen.getAllByRole('img');

    expect(images[0]).toHaveAttribute('src', expect.stringContaining(pokemonPos.image));
    expect(images[0]).toHaveAttribute('alt', expect.stringContaining(image));
  });

  it('Teste se o card indicado na Pokédex contém um link de navegação.', () => {
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', expect.stringContaining('/pokemons/'));
  });

  it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);

    const title = screen.getByRole('heading', { name: /pikachu details/i });
    expect(title).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const linkMore = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkMore);
    const checkFavotito = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(checkFavotito);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('/star-icon.svg'));
    expect(images[1]).toHaveAttribute('alt', expect.stringContaining(favorite));
  });
});
