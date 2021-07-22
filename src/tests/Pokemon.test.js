import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(/pikachu/i);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent(/electric/i);
    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight).toHaveTextContent(/Average weight:/i);
    expect(pokeWeight).toHaveTextContent(/6.0/i);
    expect(pokeWeight).toHaveTextContent(/kg/i);
    const image = screen.getByAltText(/pikachu sprite/i);
    expect(image).toHaveAttribute('src', imgUrl);
  });

  it(`Teste se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const summary = screen.getAllByRole('heading', { level: 2 });
    expect(summary[0]).toHaveTextContent(/pikachu details/i);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const buttonType = screen.queryAllByTestId('pokemon-type-button');
    expect(buttonType[6]).toBeInTheDocument();
    userEvent.click(buttonType[6]);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const favoriteQuestion = screen.getByText(/pokémon favoritado?/i);
    expect(favoriteQuestion).toBeInTheDocument();
    userEvent.click(favoriteQuestion);
    const favoriteIcon = screen
      .getByAltText('Dragonair is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
