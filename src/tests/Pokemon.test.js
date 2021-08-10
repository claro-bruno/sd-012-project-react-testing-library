import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente Pokemon', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  test('Testa se é renderizado um name com informações de determinado pokémon', () => {
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');

    const sprite = screen.getByAltText('Pikachu sprite');
    const image = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(sprite).toHaveAttribute('src', image);
  });

  test('Testa se o card do Pokémon tem um link com exibição de detalhes', () => {
    const linkDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(linkDetails).toBeDefined();
  });

  test('Testa se ao clicar no link do Pokémon, redireciona da aplicação', () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const details = screen.getByText(/pikachu details/i);
    expect(details).toBeDefined();
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const link = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(link);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const pokemonFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemonFavorite).toBeDefined();
  });
});
