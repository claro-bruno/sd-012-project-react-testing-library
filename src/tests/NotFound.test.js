import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do componente About', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
  });

  test('A página contém um heading h2 com o texto Page requested not found 😭', () => {
    const noMacth = screen.getByText(/Page requested not found/i);
    expect(noMacth).toBeDefined();
  });

  test('Quando a página não foi encontrada, mostra um gif (src e alt)', () => {
    // Feito com ajuda de Daniel Batista - turma 12
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = screen.getByAltText(/Pikachu crying because the page/i);
    expect(alt.src).toBe(link);
  });
});
