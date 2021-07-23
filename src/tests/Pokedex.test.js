import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica Pokedex.js', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const subtitleHome = screen.getByRole('heading',
      { name: /Encountered pokémons/i });
    expect(subtitleHome.localName).toBe('h2');

    expect(subtitleHome).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokémon quando o botão é clicado', () => {
    renderWithRouter(<App />);
    // O botão deve conter o texto Próximo pokémon;
    const buttonNext = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    userEvent.click(buttonNext);
    const getPokemon = screen.getAllByTestId('pokemon-name');
    expect(getPokemon.length).toBe(1);
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const buttonNext = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    const getPokemon = screen.getAllByTestId('pokemon-name');

    userEvent.click(buttonNext);
    expect(getPokemon.length).toBe(1);
    userEvent.click(buttonNext);
    expect(getPokemon.length).toBe(1);
    userEvent.click(buttonNext);
    expect(getPokemon.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    renderWithRouter(<App />);
    // ATENÇÃO ----- REFATORAR CÓDIGO DEPOIS.

    // O botão All precisa estar sempre visível.
    const allButtonPokemonsFilter = screen.getByRole('button',
      { name: /All/i });
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    const buttonType = screen.getAllByTestId('pokemon-type-button');
    expect(buttonType[0]).toHaveTextContent(/Electric/i);
    expect(buttonType[1]).toHaveTextContent(/Fire/i);
    expect(buttonType[2]).toHaveTextContent(/Bug/i);
    expect(buttonType[3]).toHaveTextContent(/Poison/i);
    expect(buttonType[4]).toHaveTextContent(/Psychic/i);
    expect(buttonType[5]).toHaveTextContent(/Normal/i);
    expect(buttonType[6]).toHaveTextContent(/Dragon/i);

    // const pokemonType = screen.getByTestId('pokemon-type');

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    userEvent.click(buttonType[0]);
    const pokedexElectric = screen.getByText('Pikachu', 'Electric');
    expect(pokedexElectric).toBeInTheDocument();
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    userEvent.click(buttonType[1]);
    const pokedexFire = screen.getByText('Charmander', 'Fire');
    expect(pokedexFire).toBeInTheDocument();
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    userEvent.click(buttonType[2]);
    const pokedexBug = screen.getByText('Caterpie', 'Bug');
    expect(pokedexBug).toBeInTheDocument();
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    userEvent.click(buttonType[3]);
    const pokedexPoison = screen.getByText('Ekans', 'Poison');
    expect(allButtonPokemonsFilter).toBeInTheDocument();
    expect(pokedexPoison).toBeInTheDocument();

    userEvent.click(buttonType[4]);
    const pokedexPsychic = screen.getByText('Alakazam', 'Psychic');
    expect(pokedexPsychic).toBeInTheDocument();
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    userEvent.click(buttonType[5]);
    const pokedexNormal = screen.getByText('Snorlax', 'Normal');
    expect(pokedexNormal).toBeInTheDocument();
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    userEvent.click(buttonType[6]);
    const pokedexDragon = screen.getByText('Dragonair', 'Dragon');
    expect(pokedexDragon).toBeInTheDocument();
    expect(allButtonPokemonsFilter).toBeInTheDocument();

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const dragonButtonFilter = screen.getByRole('button',
      { name: /Dragon/i });
    userEvent.click(dragonButtonFilter);
    // const buttonNext = screen.getByRole('button',
    // { name: /Próximo pokémon/i });
    // userEvent.click(buttonNext);
    // expect(pokedexElectric).toBeInTheDocument();

    // O texto do botão deve ser All;
    const allButtonResetFilter = screen.getByRole('button',
      { name: /All/i });
    expect(allButtonResetFilter).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    // Ao carregar a página, o filtro selecionado deverá ser All;
    userEvent.click(allButtonResetFilter);
    const buttonNext = screen.getByTestId('next-pokemon',
      { name: /Próximo pokémon/i });
    expect(buttonNext).toBeEnabled();
  });
});
