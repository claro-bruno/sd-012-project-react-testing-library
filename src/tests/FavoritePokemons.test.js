import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('a mensagem No favorite pokemon found, se não tiver pokémons favoritos.', () => {
    render(<FavoritePokemons />);
    const texto = screen.getByText(/No favorite pokemon found/i);
    expect(texto).toBeDefined();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: /More details/i });
    expect(linkMoreDetails).toBeDefined();
    userEvent.click(linkMoreDetails);

    const checkBox = screen.getByRole('checkbox', 'Pokémon favoritado?');
    expect(checkBox).toBeDefined();
    userEvent.click(checkBox);

    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeDefined();
    userEvent.click(linkFavorite);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');

    // https://github.com/testing-library/jest-dom
    expect(name).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('6.0 kg');
  });
});

/**
npx stryker run ./stryker/FavoritePokemons.conf.json
17:10:06 (206446) INFO InputFileResolver Found 1 of 65 file(s) to be mutated.
17:10:06 (206446) INFO InitialTestExecutor Starting initial test run. This may take a while.
17:10:12 (206446) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 5 seconds (net 5836 ms, overhead 1 ms).
17:10:12 (206446) INFO MutatorFacade 1 Mutant(s) generated (11 Mutant(s) excluded)
17:10:12 (206446) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [=======================================] 100% (elapsed: <1m, remaining: n/a) 1/1 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
---------------------|---------|----------|-----------|------------|----------|---------|
File                 | % score | # killed | # timeout | # survived | # no cov | # error |
---------------------|---------|----------|-----------|------------|----------|---------|
All files            |  100.00 |        1 |         0 |          0 |        0 |       0 |
FavoritePokemons.js  |  100.00 |        1 |         0 |          0 |        0 |       0 |
---------------------|---------|----------|-----------|------------|----------|---------|
17:10:18 (206446) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
17:10:18 (206446) INFO Stryker Done in 12 seconds.
 */
