import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe(' Teste o componente <Pokemon.js />', () => {
  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    // usando o toContainHTML para variar, mas funcionaria com toHaveTextContent
    expect(screen.getByTestId('pokemon-type')).toContainHTML(type);
    expect(screen.getByTestId('pokemon-name')).toContainHTML(name);
    expect(screen.getByTestId('pokemon-weight')).toContainHTML(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link ', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeDefined();
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    const linkFavorite = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(linkFavorite).toBeDefined();
    userEvent.click(linkFavorite);

    expect(
      screen.getByRole('img', { name: `${name} is marked as favorite` }),
    ).toHaveAttribute('src', '/star-icon.svg');
  });
});

/**
npx stryker run ./stryker/Pokemon.conf.json
17:17:08 (595724) INFO InputFileResolver Found 1 of 66 file(s) to be mutated.
17:17:08 (595724) INFO InitialTestExecutor Starting initial test run. This may take a while.
17:17:14 (595724) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 5 seconds (net 5782 ms, overhead 1 ms).
17:17:14 (595724) INFO MutatorFacade 5 Mutant(s) generated (10 Mutant(s) excluded)
17:17:14 (595724) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [=======================================] 100% (elapsed: <1m, remaining: n/a) 5/5 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
------------|---------|----------|-----------|------------|----------|---------|
File        | % score | # killed | # timeout | # survived | # no cov | # error |
------------|---------|----------|-----------|------------|----------|---------|
All files   |  100.00 |        5 |         0 |          0 |        0 |       0 |
Pokemon.js  |  100.00 |        5 |         0 |          0 |        0 |       0 |
------------|---------|----------|-----------|------------|----------|---------|
17:17:29 (595724) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
17:17:29 (595724) INFO Stryker Done in 20 seconds.

 */
