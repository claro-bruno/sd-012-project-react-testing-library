import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Teste o componente <PokemonDetails.js />', () => {
  it(`Teste se as informações detalhadas do Pokémon
  selecionado são mostradas na tela.`, () => {
    const summary = /Apparently, it appears only to those people/i;
    const nextButton = screen.getByTestId('next-pokemon');
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/151');
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent(/mew/i);
    expect(headings[0]).toHaveTextContent(/details/i);
    expect(moreDetailsLink).not.toBeInTheDocument();
    expect(headings[1]).toHaveTextContent(/summary/i);
    const paragraph = screen.getByText(summary);
    expect(paragraph).toBeInTheDocument();
  });

  it(`Teste se existe na página uma seção com os mapas
  contendo as localizações do pokémon`, () => {
    const nextButton = screen.getByTestId('next-pokemon');
    const URL_ONE = 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png';
    const URL_TWO = 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png';
    const URL_THREE = 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png';
    const URL_FOUR = 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png';
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/4');
    expect(moreDetailsLink).toBeInTheDocument();
    userEvent.click(moreDetailsLink);
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[2]).toHaveTextContent(/game locations of/i);
    expect(headings[2]).toHaveTextContent(/charmander/i);
    const nameLocation = screen.getAllByAltText(/charmander location/i);
    expect(nameLocation).toHaveLength(2 + 2);
    expect(nameLocation[0]).toHaveAttribute('src', URL_ONE);
    expect(nameLocation[1]).toHaveAttribute('src', URL_TWO);
    expect(nameLocation[2]).toHaveAttribute('src', URL_THREE);
    expect(nameLocation[3]).toHaveAttribute('src', URL_FOUR);
  });

  it(`Teste se o usuário pode favoritar um pokémon
  através da página de detalhes.`, () => {
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
