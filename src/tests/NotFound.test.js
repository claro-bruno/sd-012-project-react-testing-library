import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste contém um h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const h2 = screen.getByText(/Page requested not found/i);
    expect(h2).toBeInTheDocument();
  });

  test('Teste se página mostra a texto', () => {
    render(<NotFound />);
    const texto = screen.getByRole('img', { name: 'Crying emoji' });
    expect(texto).toHaveTextContent('😭');
  });

  test('Teste se página mostra a imagem', () => {
    render(<NotFound />);
    const img = screen.getByRole('img', { name: /Pikachu/i });
    expect(img).toHaveAttribute('src', URL);
  });
});

/**
npx stryker run ./stryker/NotFound.conf.json
18:23:15 (221911) INFO InputFileResolver Found 1 of 65 file(s) to be mutated.
18:23:15 (221911) INFO InitialTestExecutor Starting initial test run. This may take a while.
18:23:21 (221911) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 5 seconds (net 5266 ms, overhead 0 ms).
18:23:21 (221911) INFO MutatorFacade 2 Mutant(s) generated (1 Mutant(s) excluded)
18:23:21 (221911) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [=======================================] 100% (elapsed: <1m, remaining: n/a) 2/2 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
-------------|---------|----------|-----------|------------|----------|---------|
File         | % score | # killed | # timeout | # survived | # no cov | # error |
-------------|---------|----------|-----------|------------|----------|---------|
All files    |  100.00 |        2 |         0 |          0 |        0 |       0 |
NotFound.js  |  100.00 |        2 |         0 |          0 |        0 |       0 |
-------------|---------|----------|-----------|------------|----------|---------|
18:23:28 (221911) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
18:23:28 (221911) INFO Stryker Done in 12 seconds.

 */