import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import { NotFound } from '../components';

describe('Teste componente Notfound', () => {
  test('Testa se a pagina contem um h2 com Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found/i');
    const subtitle = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(subtitle).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem do pikachu triste ', () => {
    renderWithRouter(<NotFound />);
    const gifpikachu = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgNotFound = screen.getByRole('img', { name: /Pikachu/i });

    expect(imgNotFound).toHaveAttribute('src', gifpikachu);
  });
});
