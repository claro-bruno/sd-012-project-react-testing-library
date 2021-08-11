import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {

  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const imageAlt = screen.getByAltText('Pikachu sprite');

    expect(name).toHaveTextContent(/Pikachu/i);
    expect(type).toHaveTextContent(/Electric/i);
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');
    expect(imageAlt).toBeInTheDocument();
    expect(imageAlt).not.toHaveAttribute('src', '');
  });

  test('Pokémon indicado contém um link de navegação para exibir detalhes deste', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText('More details');
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails.href).toBe('http://localhost/pokemons/25');
  });

  test('Ao clicar no link de navegação, redirecciona a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const clickDetails = screen.getByText(/more details/i);
    expect(clickDetails).toBeInTheDocument();
    userEvent.click(clickDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const clickDetails = screen.getByText(/more details/i);
    userEvent.click(clickDetails);
    const clickFavorite = screen.getByText(/pokémon favoritado?/i);
    userEvent.click(clickFavorite);
    const verifyFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(verifyFavorite).toHaveAttribute('src', '/star-icon.svg');
  });

});
