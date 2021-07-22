import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica Pokemon.js', () => {
  it('Testa informações do card', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const img = screen.getByRole('img', { name: `${pokemonName.innerHTML} sprite` });
    const URL_IMG = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(pokemonName).toBeDefined();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeDefined();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeDefined();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(moreDetails).toBeDefined();
    expect(img).toHaveAttribute('src', URL_IMG);
  });

  it('Testa se tem o link More details e se redireciona para página do pokemon', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');

    expect(moreDetails).toBeDefined();
    expect(screen.getByText('Summary')).toBeDefined();
    expect(checkbox).toBeDefined();
  });

  it('Testa se exibe detalhes do pikachu', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    const pokemonName = screen.getByTestId('pokemon-name');

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    const { pathname } = history.location;

    expect(checkbox).toBeDefined();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    expect(pathname).toBe('/pokemons/25');
  });

  it('Testa se favorita Pikachu na more details', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });

    userEvent.click(moreDetails);

    const checkbox = screen.getByRole('checkbox');
    expect(screen.getByText('Summary')).toBeDefined();
    userEvent.click(checkbox);

    const iconFavorite = screen.getAllByRole('img');

    expect(iconFavorite[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(iconFavorite[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
