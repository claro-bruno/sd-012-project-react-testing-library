import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/application/i);
    const p2 = screen.getByText(/filter/i);
    expect(p1 && p2).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeDefined();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'); // .toHaveValue('pikachu')
  });
});

/**
 *
npx stryker run ./stryker/About.conf.json
16:02:00 (199720) INFO InputFileResolver Found 1 of 65 file(s) to be mutated.
16:02:00 (199720) INFO InitialTestExecutor Starting initial test run. This may take a while.
16:02:05 (199720) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 5 seconds (net 5354 ms, overhead 1 ms).
16:02:05 (199720) INFO MutatorFacade 2 Mutant(s) generated (1 Mutant(s) excluded)
16:02:05 (199720) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [] 100% (elapsed: <1m, remaining: n/a) 2/2 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
----------|---------|----------|-----------|------------|----------|---------|
File      | % score | # killed | # timeout | # survived | # no cov | # error |
----------|---------|----------|-----------|------------|----------|---------|
All files |  100.00 |        2 |         0 |          0 |        0 |       0 |
About.js  |  100.00 |        2 |         0 |          0 |        0 |       0 |
----------|---------|----------|-----------|------------|----------|---------|
16:02:12 (199720) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
16:02:12 (199720) INFO Stryker Done in 12 seconds.
 */
