import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  test('Testa se renderiza card do pokemon e suas info', () => {
    renderWithRouter(<App />);
    const { name, type, image, averageWeight } = pokemons[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(name);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.innerHTML).toBe(type);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight.innerHTML)
      .toBe(`Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`);
    const pokemonImg = screen.getByRole('img', { Name: `${pokemonName} sprite` });
    expect(pokemonImg.src).toBe(image);
    expect(pokemonImg.alt).toBe(`${name} sprite`);
  });

  test('Testa se o link possui a URL /pokemons/id para cada id de poke', () => {
    renderWithRouter(<App />);
    const { id } = pokemons[0];
    const linkDetails = screen.getByText(/More details/i);
    fireEvent.click(linkDetails);
    expect(linkDetails.href.endsWith(`/pokemons/${id}`)).toBeTruthy();
  });

  test('Testa se redireciona para a página de detalhes do poke', () => {
    renderWithRouter(<App />);
    const { name } = pokemons[0];
    expect(screen.getByText(/Encountered pokémons/i)).toBeInTheDocument();
    const linkDetais = screen.getByText(/More details/i);
    fireEvent.click(linkDetais);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
  });

  test('Testa se existe ícone de estrela nos poke favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(/More details/i);
    fireEvent.click(linkDetails);
    const favoriteCheck = screen.getByText(/Pokémon favoritado?/i);
    fireEvent.click(favoriteCheck);
    const starIcon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon.src.endsWith('/star-icon.svg')).toBe(true);
  });
});
