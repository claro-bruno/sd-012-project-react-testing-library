import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa tela de página não encontrada', () => {
  test('Testa elementos renderizados em page Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paturso');
    const notFound = screen
      .getByRole('heading', { name: 'Page requested not found Crying emoji' });
    const notFoundImg = screen
      .getByRole('img', {
        name: 'Pikachu crying because the page requested was not found',
      });
    expect(notFound).toBeInTheDocument();
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
// test json
