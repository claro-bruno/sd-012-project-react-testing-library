import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica requisitos do desafio 6', () => {
  it('Verifica se a página exibe os atributos do Pokemon', () => {
    renderWithRouter(<App />);

    // Vai para a secao details do Pokemon
    const details = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(details);

    // Adiciona o Pokemon como favorito
    const check = screen.getByRole('checkbox');
    userEvent.click(check);

    // Vai para a pagina de Pokemons favoritos
    const favPokemons = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    userEvent.click(favPokemons);

    // Verifica atributos do pokemon
    const pokemon = screen.getByText('Pikachu');
    const type = screen.getByText('Electric');
    const weight = screen.getByText('Average weight: 6.0 kg');
    const image = screen.getByAltText('Pikachu sprite');

    expect(pokemon).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Verifica se o card do Pokemon exibe um link para more details', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByRole('link', {
      name: /More details/i,
    });
    expect(pokemon).toHaveAttribute('href', '/pokemons/25');
  });

  it('Verifica se ao clicar no link, você é redirecionado a page more details', () => {
    const { history } = renderWithRouter(<App />);

    const pokemon = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(pokemon);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifica se os pokemons favoritados tem estrelinha', () => {
    renderWithRouter(<App />);

    const favorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });

    userEvent.click(favorite);

    const pokemon = screen.getByAltText('Pikachu is marked as favorite');

    expect(pokemon).toHaveAttribute('src', '/star-icon.svg');
    expect(pokemon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
