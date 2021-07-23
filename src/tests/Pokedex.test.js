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
    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {

  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    renderWithRouter(<App />);
    // ATENÇÃO ----- REFATORAR CÓDIGO DEPOIS.
    // const pokemon = screen.getAllByTestId('pokemon-name');
    // const pokemonButtonFilter = screen.getByRole('button',
    //   { name: /{pokemon-name}/i });
    // expect(pokemon).toBe(pokemonButtonFilter);

    const electricButtonFilter = screen.getByRole('button',
      { name: /Electric/i });
    expect(electricButtonFilter).toBeInTheDocument();

    const fireButtonFilter = screen.getByRole('button',
      { name: /Fire/i });
    expect(fireButtonFilter).toBeInTheDocument();

    const bugButtonFilter = screen.getByRole('button',
      { name: /Bug/i });
    expect(bugButtonFilter).toBeInTheDocument();

    const poisonButtonFilter = screen.getByRole('button',
      { name: /Poison/i });
    expect(poisonButtonFilter).toBeInTheDocument();

    const psychicButtonFilter = screen.getByRole('button',
      { name: /Psychic/i });
    expect(psychicButtonFilter).toBeInTheDocument();

    const normalButtonFilter = screen.getByRole('button',
      { name: /Normal/i });
    expect(normalButtonFilter).toBeInTheDocument();

    const dragonButtonFilter = screen.getByRole('button',
      { name: /Dragon/i });
    expect(dragonButtonFilter).toBeInTheDocument();

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    userEvent.click(electricButtonFilter);
    const pokedexElectric = screen.getByText('Pikachu', 'Electric');
    expect(pokedexElectric).toBeInTheDocument();

    userEvent.click(fireButtonFilter);
    const pokedexFire = screen.getByText('Charmander', 'Fire');
    expect(pokedexFire).toBeInTheDocument();

    userEvent.click(bugButtonFilter);
    const pokedexBug = screen.getByText('Caterpie', 'Bug');
    expect(pokedexBug).toBeInTheDocument();

    userEvent.click(poisonButtonFilter);
    const pokedexPoison = screen.getByText('Ekans', 'Poison');
    expect(pokedexPoison).toBeInTheDocument();

    userEvent.click(psychicButtonFilter);
    const pokedexPsychic = screen.getByText('Alakazam', 'Psychic');
    expect(pokedexPsychic).toBeInTheDocument();

    userEvent.click(normalButtonFilter);
    const pokedexNormal = screen.getByText('Snorlax', 'Normal');
    expect(pokedexNormal).toBeInTheDocument();

    userEvent.click(dragonButtonFilter);
    const pokedexDragon = screen.getByText('Dragonair', 'Dragon');
    expect(pokedexDragon).toBeInTheDocument();

    // O botão All precisa estar sempre visível.
    const allButtonPokemonsFilter = screen.getByRole('button',
      { name: /All/i });
    expect(allButtonPokemonsFilter).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const dragonButtonFilter = screen.getByRole('button',
      { name: /Dragon/i });
    userEvent.click(dragonButtonFilter);

    // O texto do botão deve ser All;
    const allButtonResetFilter = screen.getByRole('button',
      { name: /All/i });
    expect(allButtonResetFilter).toBeInTheDocument();

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    // Ao carregar a página, o filtro selecionado deverá ser All;
    userEvent.click(allButtonResetFilter);
    const buttonNext = screen.getByRole('button',
      { name: /Próximo pokémon/i });
    expect(buttonNext).toBeEnabled();
  });
});
