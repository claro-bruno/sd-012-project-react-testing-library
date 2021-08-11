import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound', () => {
  test('Testa se contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pokemon');
    const notFound = screen
      .getByRole('heading', { name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se mostra uma determinada imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image[1].src).toBe(src);
  });
});
