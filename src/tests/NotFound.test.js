import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe('Teste do componente NotFound', () => {
  test('Testa se a pagina contém um h2 com o Page requested not found', () => {
    const { history } = RenderWithRouter(<NotFound />);

    history.push('/not-found');
    const subtitleH2 = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(subtitleH2).toBeInTheDocument();
  });
  test('Testa se renderiza a imagem esperada', () => {
    RenderWithRouter(<NotFound />);
    const imgNotFound = screen.getByAltText(/pikachu crying/i);
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
