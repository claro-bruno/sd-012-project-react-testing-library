import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => renderWithRouter(<NotFound />));
afterEach(cleanup);

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página tem um heading h2 com o texto Page requested not found 😭', () => {
    const h2 = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se a página contém uma imagem', () => {
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgAlt = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(imgAlt.src).toBe(link);
  });
});
