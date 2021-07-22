import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../types/renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  test('Verifica se é renderizado um card com as informações de um pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    const image = screen.getByRole('img');
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const electricType = screen.getByTestId('pokemon-type');
    expect(electricType).toHaveTextContent('Electric');
    const averageWeight = screen.getByText('Average weight: 6.0 kg');
    expect(averageWeight).toBeInTheDocument();
    const urlImage = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(image.src).toContain(urlImage);
    const url = history.location.pathname;
    expect(url).toBe('/');
    const altText = 'Pikachu sprite';
    expect(image.alt).toContain(altText);
  });
  test('Verifica se o card do Pokémon indicado na Pokédex contém um link', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    const url = history.location.pathname;
    expect(url).toBe('/');
  });
  test('Verifica se é feito o redirecionamento da aplicação para mais detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const electricButton = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricButton);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const favoritePokemon = screen.getByRole('checkbox');
    userEvent.click(favoritePokemon);
    const image = screen.getAllByRole('img');
    expect(image[1].src).toBe('http://localhost/star-icon.svg');
    expect(image[1].alt).toBe('Pikachu is marked as favorite');
    const url = history.location.pathname;
    expect(url).toBe('/pokemons/25');
  });
});
