import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

describe('Testa o componente "Pokemon"', () => {
  it('Verifica se é renderizado um card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: `${pokemonName.innerHTML} sprite` });
    expect(pokemonName).toHaveTextContent(/^Pikachu$/);
    expect(pokemonType).toHaveTextContent(/^Electric$/);
    expect(pokemonWeight).toHaveTextContent(/^Average weight: 6.0 kg$/);
    expect(img).toHaveAttribute('src', URL);
  });

  it('Verifica se ao clicar no link leva a pagina de detalhes do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const details = screen.getByRole('link', { name: 'More details' });
    expect(details).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(details);
    expect(pokemonName).toHaveTextContent(/^Pikachu$/);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica se os pokemon favoritos aparecem', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);
    expect(screen.getByText('Summary')).toBeInTheDocument();
    const favoriteButton = screen.getByRole('checkbox');
    userEvent.click(favoriteButton);
    const starIcon = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
