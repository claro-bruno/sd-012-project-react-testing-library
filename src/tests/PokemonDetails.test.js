import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  const { name, foundAt, summary } = pokemons[0];
  test('Teste as informações detalhadas do Pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(
      screen.getByRole('heading', { name: `${name} Details` }),
    ).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /summary/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const locations = ['Kanto Viridian Forest', 'Kanto Power Plant'];
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    expect(
      screen.getByRole('heading', { name: `Game Locations of ${name}` }),
    ).toBeInTheDocument();

    foundAt.forEach((item, index) => {
      const imagens = screen.getAllByRole('img', { name: `${name} location` });
      expect(imagens[index]).toHaveAttribute('src', item.map);
    });

    locations.forEach((item, index) => {
      expect(screen.getByText(item)).toBeInTheDocument();
      const imagens = screen.getAllByRole('img', { name: `${name} location` });
      expect(imagens[index]).toHaveAttribute('src', foundAt[index].map);
    });
  });
  test('Teste se o usuário pode favoritar através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    expect(
      screen.getByRole('img', { name: `${name} is marked as favorite` }),
    ).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(checkBox);

    expect(
      screen.queryByRole('img', { name: `${name} is marked as favorite` }),
    ).not.toBeInTheDocument();

    expect(screen.getByText(/Pokémon favoritado?/i)).toBeInTheDocument();
  });
});

/**
npx stryker run ./stryker/PokemonDetails.conf.json
18:37:46 (609883) INFO InputFileResolver Found 1 of 65 file(s) to be mutated.
18:37:46 (609883) INFO InitialTestExecutor Starting initial test run. This may take a while.
18:37:53 (609883) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 6 seconds (net 6063 ms, overhead 1 ms).
18:37:53 (609883) INFO MutatorFacade 6 Mutant(s) generated (16 Mutant(s) excluded)
18:37:53 (609883) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [=======================================] 100% (elapsed: <1m, remaining: n/a) 6/6 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
-------------------|---------|----------|-----------|------------|----------|---------|
File               | % score | # killed | # timeout | # survived | # no cov | # error |
-------------------|---------|----------|-----------|------------|----------|---------|
All files          |  100.00 |        6 |         0 |          0 |        0 |       0 |
PokemonDetails.js  |  100.00 |        6 |         0 |          0 |        0 |       0 |
-------------------|---------|----------|-----------|------------|----------|---------|
18:38:11 (609883) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
18:38:11 (609883) INFO Stryker Done in 24 seconds.
 */
