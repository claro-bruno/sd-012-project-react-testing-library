import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica Pokedex.js', () => {
  it('Testa renderização do h2', () => {
    renderWithRouter(<App />);

    const subtitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(subtitle).toBeDefined();
  });

  it('Testa se botão de próximo pokémon é renderizado na tela', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(btnNext).toBeDefined();
  });

  it('Verifica se página é renderizada com pikachu já na tela', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeDefined();
  });

  it('Verifica se ao clicar no botão próximo pokémon muda o pokémon', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByRole('button', { name: /Próximo pokémon/i });

    userEvent.click(btnNext);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeDefined();
  });

  it('Verifica se o último pokemon é o dragonair após a ele retorna para pikachu', () => {
    renderWithRouter(<App />);

    const btnNext = screen.getByTestId('next-pokemon');
    userEvent.click(btnNext);

    const NUMBER = 8;
    for (let index = 1; index < NUMBER; index += 1) {
      userEvent.click(btnNext);
    }
    const dragonair = screen.getByText('Dragonair');

    expect(dragonair).toBeDefined();
    userEvent.click(btnNext);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeDefined();
  });

  it('Verifica se botões de tipo são renderizados', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(pokemonName).toBeDefined();
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toBeDefined();
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toBeDefined();
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Testa funcionamento do botão All', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: /All/i });
    userEvent.click(btnAll);
    expect(screen.getByText('Pikachu')).toBeDefined();
  });

  it('Testa o botão de filtro por type e ver se mostra pokemon do tipo', () => {
    renderWithRouter(<App />);

    const btnFire = screen.getByRole('button', { name: /fire/i });
    userEvent.click(btnFire);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getAllByText('Fire')[0]).toBeInTheDocument();
    expect(screen.getByText('Average weight: 8.5 kg')).toBeInTheDocument();
  });
});
