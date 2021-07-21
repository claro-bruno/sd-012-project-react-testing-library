import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Teste do componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pagina-que-nao-existe');
    const noMacth = screen.getByText(/Page requested not found/i);
    expect(noMacth).toBeDefined();
    // Feito com ajuda de Daniel Batista - turma 12
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/Pikachu crying because the page/i);
    expect(img.src).toBe(link);
  });
});
