import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Testa Pokemon', () => {
  test('Testa o nome do Pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  });

  test('Testa o tipo do pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Electric');
  });

  test('Testa o peso do pokemon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');
  });

  test('Testa imagem', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    const URL = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toHaveAttribute('src', URL);
  });
});

test('Testa link para detalhes do pokemon', () => {
  const { history } = renderWithRouter(<App />);
  const link = screen.getByText(/more details/i);

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', '/pokemons/25');
  userEvent.click(link);
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Testa se pokemon favorito tem estrela', () => {
  const pokemon = pokemons[0];
  renderWithRouter(<Pokemon isFavorite pokemon={ pokemon } />);
  const icon = screen.getByAltText('Pikachu is marked as favorite');
  expect(icon).toHaveAttribute('src', '/star-icon.svg');
});
