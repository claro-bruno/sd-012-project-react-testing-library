import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import App from '../App';

describe('Testa o componente Pokemon', () => {
  test('É renderizado um card com as informações de determinado pokémon.', () => {
    RenderWithRouter(<App />);
    const card = screen.getByTestId('pokemon-name');
    expect(card).toHaveTextContent('Pikachu');

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');

    const sprite = screen.getByAltText('Pikachu sprite');
    const img = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(sprite).toHaveAttribute('src', img);
  });

  test('O card do Pokémon contém link com exibição de detalhes', () => {
    RenderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(details).toBeDefined();
  });

  test('Ao clicar no link do Pokémon, é feito o redirecionamento da aplicação', () => {
    RenderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const details = screen.getByText(/pikachu details/i);
    expect(details).toBeDefined();
  });

  test('Testa se a URL exibida no navegador muda para /pokemon/<id>,', () => {
    const { history } = RenderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    RenderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(details);
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);

    const starPokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starPokemon).toHaveAttribute('src', '/star-icon.svg');
    expect(starPokemon).toBeDefined();
  });
});
