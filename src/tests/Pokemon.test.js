import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const firstPokemon = pokemons[0];
const { value, measurementUnit } = firstPokemon.averageWeight;
const AVERAGE_WEIGHT = `Average weight: ${value} ${measurementUnit}`;
const IMAGE_ALT = `${firstPokemon.name} sprite`;
const STAR_ALT = `${firstPokemon.name} is marked as favorite`;

describe('Testando se o Pokemon.js', () => {
  it('renderiza um card com as infos de um pokemon', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(firstPokemon.name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(firstPokemon.type);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(AVERAGE_WEIGHT);

    const images = screen.getAllByRole('img');

    expect(images[0]).toHaveAttribute('src', expect.stringContaining(firstPokemon.image));
    expect(images[0]).toHaveAttribute('alt', expect.stringContaining(IMAGE_ALT));
  });

  it('contém um link para a página de detalhes do pokemon', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', expect.stringContaining('/pokemons/25'));
  });

  it('redireciona para página de detalhes ao clicar no link esperado', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    expect(screen.getByRole('heading', { name: /pikachu details/i })).toBeInTheDocument();

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('exibe um ícone de estrela no pokemon favoritado', () => {
    renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', { name: /more details/i }));
    userEvent.click(screen.getByLabelText(/pokémon favoritado?/i));
    userEvent.click(screen.getByRole('link', { name: /home/i }));

    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', expect.stringContaining('/star-icon.svg'));
    expect(images[1]).toHaveAttribute('alt', expect.stringContaining(STAR_ALT));
  });
});
