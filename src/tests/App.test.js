import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o component <App.js>', () => {
  test('verifica se há o texto Home na tela inicial', () => {
    renderWithRouter(<App />);
    const textoHome = screen.getByText('Home');
    expect(textoHome).toBeInTheDocument();
  });

  test('verifica se há o texto about na tela inicial', () => {
    renderWithRouter(<App />);
    const textoAbout = screen.getByText('About');
    expect(textoAbout).toBeInTheDocument();
  });

  test('verifica se há o texto Favorite Pokémons na tela inicial', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
  });

  test('teste se ao clicar em Home a url muda para /', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('teste se ao clicar em About a url muda para /about', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('teste se ao clicar em Favorite Pokémons a url muda para /favorite', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(linkFavorite);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('verificar se renderiza rota não encontrada ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    expect(screen.getByText('Page requested not found')).toBeInTheDocument();
  });
});

/**
npx stryker run ./stryker/App.conf.json
15:27:39 (195992) INFO InputFileResolver Found 1 of 65 file(s) to be mutated.
15:27:39 (195992) INFO InitialTestExecutor Starting initial test run. This may take a while.
15:27:45 (195992) INFO InitialTestExecutor Initial test run succeeded. Ran 1 tests in 5 seconds (net 5854 ms, overhead 0 ms).
15:27:45 (195992) INFO MutatorFacade 3 Mutant(s) generated (15 Mutant(s) excluded)
15:27:45 (195992) INFO SandboxPool Creating 12 test runners (based on CPU count)
Mutation testing  [=======================================] 100% (elapsed: <1m, remaining: n/a) 3/3 tested (0 survived, 0 timed out)

Ran 1.00 tests per mutant on average.
----------|---------|----------|-----------|------------|----------|---------|
File      | % score | # killed | # timeout | # survived | # no cov | # error |
----------|---------|----------|-----------|------------|----------|---------|
All files |  100.00 |        3 |         0 |          0 |        0 |       0 |
App.js    |  100.00 |        3 |         0 |          0 |        0 |       0 |
----------|---------|----------|-----------|------------|----------|---------|
15:27:55 (195992) INFO HtmlReporter Your report can be found at: file:///media/andre/Novo%20volume/Curso/TRYBE/BLOCO_15_Testes_automatizados/PROJETO/sd-012-project-react-testing-library/reports/mutation/html/index.html
15:27:55 (195992) INFO Stryker Done in 15 seconds.
 */
