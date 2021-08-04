import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

const pokenameIdTest = 'pokemon-name';

describe('Teste o componente <Pokedex.js />', () => {
  test('este se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const h2 = screen.getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  test('Teste lista quando o botão Próximo pokémon é clicado.', () => {
    renderWithRouter(<App />);

    const button = screen.getByTestId('next-pokemon');
    expect(button).toHaveTextContent('Próximo pokémon');
    expect(button).toBeInTheDocument();

    // verifica se somente aparece o nome do primeiro pokemon um vez
    let pokemonNameOnScreen = screen.getByTestId(pokenameIdTest);
    expect(pokemonNameOnScreen).toBeInTheDocument();
    pokemons.map((pokemon, index) => {
      expect(pokemonNameOnScreen).toHaveTextContent(pokemon.name);
      userEvent.click(button);
      return expect(pokemonNameOnScreen).not.toHaveTextContent(
        pokemons[index].name,
      );
    });
    // dar o click no último pokemon
    pokemons.forEach((pokemon, index) => {
      if (index < pokemons.length - 1) userEvent.click(button);
    });
    // pega o nome do último pokemon que está na tela
    pokemonNameOnScreen = screen.getByTestId(pokenameIdTest);
    // nome do último pokemon no objeto
    const lastPokemon = pokemons[8].name;
    // espera que o nome do pokemon na tela seja igual do último pokemon no objeto
    expect(pokemonNameOnScreen).toHaveTextContent(lastPokemon);
    // nome do primeiro pokemon
    const firstPokemon = pokemons[0].name;
    // click para ir para o primeiro pokemon
    userEvent.click(button);
    // comparando se o nome do primeiro pokemon no objeto é igual do pokemon na tela
    pokemonNameOnScreen = screen.getByTestId(pokenameIdTest);
    expect(pokemonNameOnScreen).toHaveTextContent(firstPokemon);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    // pega o nome do pokemon na tela, retornando um array
    const pokemonsNameOnScreen = screen.getAllByTestId(pokenameIdTest);
    // o array do nome dos pokemons na tela deve ser igual a 1
    expect(pokemonsNameOnScreen.length).toBe(1);
  });
});

describe('Teste se a Pokédex tem os botões de filtro.', () => {
  test('Deve existir um botão de filtragem de Pokémon, sem repetição.', () => {
    renderWithRouter(<App />);

    // pegar os botoes de filtragem
    const buttons = screen.getAllByTestId('pokemon-type-button');
    // todos os nomes dos pokemons na tela
    const namesAllPokemonsOnScreen = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    // verifica se o número de pokemons na lista tem a mesma quantidade na tela
    expect(buttons.length).toBe(namesAllPokemonsOnScreen.length);
    // verifica se cada pokemon aparece na lista de pokemons
    buttons.map((btn, index) => {
      expect(btn).toBeInTheDocument();
      return expect(buttons[index]).toHaveTextContent(
        namesAllPokemonsOnScreen[index],
      );
    });
  });
  test('Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(<App />);
    // pegando o botão do caterpi
    const caterpieButton = screen.getByRole('button', { name: /Bug/i });
    expect(caterpieButton).toBeInTheDocument();
    // clicando no botão
    userEvent.click(caterpieButton);
    // espera aparecer o nome caterpie na tela
    expect(screen.getByTestId(pokenameIdTest)).toHaveTextContent(/Caterpie/i);
    // pegar o botão próximo pokemon
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    // o botão próximo pokemon deve estar desativado
    expect(nextPokemon).toHaveAttribute('disabled', '');
    // pegando o botão do alakazam
    const alakazanButton = screen.getByRole('button', { name: /psychic/i });
    // clicando no botão
    userEvent.click(alakazanButton);
    // clicar no botão próximo pokemon
    userEvent.click(nextPokemon);
    // espera o pokemon Mew
    expect(screen.getByTestId(pokenameIdTest)).toHaveTextContent(/Mew/i);
    // clicar no botão próximo novamente para voltar a alakazan
    userEvent.click(nextPokemon);
    expect(screen.getByTestId(pokenameIdTest)).toHaveTextContent(/alakazam/i);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // botão com o texto all
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const nextPokemon = screen.getByRole('button', {
      name: /Próximo Pokémon/i,
    });

    pokemons.forEach((poke, index) => {
      expect(screen.getByTestId(pokenameIdTest)).toHaveTextContent(
        pokemons[index].name,
      );
      userEvent.click(nextPokemon);
      expect(allButton).toBeInTheDocument();
    });
  });
});

/**
npx stryker run ./stryker/Pokedex.conf.json
16:39:55 (588340) INFO InputFileResolver Found 1 of 66 file(s) to be mutated.
16:39:55 (588340) INFO InitialTestExecutor Starting initial test run. This may take a while.
16:40:01 (588340) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 6 seconds (net 6004 ms, overhead 1 ms).
16:40:01 (588340) INFO MutatorFacade 4 Mutant(s) generated (34 Mutant(s) excluded)
16:40:01 (588340) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [=======================================] 100% (elapsed: <1m, remaining: n/a) 4/4 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
------------|---------|----------|-----------|------------|----------|---------|
File        | % score | # killed | # timeout | # survived | # no cov | # error |
------------|---------|----------|-----------|------------|----------|---------|
All files   |  100.00 |        4 |         0 |          0 |        0 |       0 |
Pokedex.js  |  100.00 |        4 |         0 |          0 |        0 |       0 |
------------|---------|----------|-----------|------------|----------|---------|
16:40:13 (588340) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
16:40:13 (588340) INFO Stryker Done in 18 seconds.
*/
