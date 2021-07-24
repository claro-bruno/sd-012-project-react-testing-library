import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('6 - Testa o componente <Pokemon.js />', () => {
  it('Verifica se é renderizado um card com as informações'
      + ' de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemons[0].name);
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pokemons[0].type);
    const pokemonData = pokemons[0].averageWeight;
    const pokemonWeight = `${pokemonData.value} ${pokemonData.measurementUnit}`;
    const weightFormat = `Average weight: ${pokemonWeight}`;
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(weightFormat);
    const pokemonImg = screen.getByRole('img', { name: `${pokemons[0].name} sprite` });
    expect(pokemonImg).toHaveAttribute('src', pokemons[0].image);
    expect(pokemonImg).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
  });

  it('Verifica se o card do Pokémon indicado na Pokédex'
      + ' contém um link de navegação para exibir detalhes desse Pokémon', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: /More details/i })).toBeInTheDocument();
  });

  it('Verifica se ao clicar no link de navegação do Pokémon, é feito'
      + ' o redirecionamento da aplicação para a página de detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    expect(screen.getByText(/Summary/i)).toBeInTheDocument();
  });

  it('Verifica se a URL exibida no navegador muda para "/pokemon/<id>", onde "<id>" é'
      + ' o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    const urlDetails = history.location.pathname;
    expect(urlDetails).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More details/i }));
    userEvent.click(screen.getByRole('checkbox', { name: /Pokémon favoritado?/i }));
    userEvent.click(screen.getByRole('link', { name: /Home/i }));
    const altAttribute = `${pokemons[0].name} is marked as favorite`;
    const favoriteIcon = screen.getByRole('img', { name: altAttribute });
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon).toHaveAttribute('alt', altAttribute);
  });
});
