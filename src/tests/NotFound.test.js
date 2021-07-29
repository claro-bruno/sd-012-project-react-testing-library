import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o componente NotFound', () => {
  it(`Testa se a página contém um heading
  h2 com o texto Page requested not found`, () => {
    render(<NotFound />);
    const h2 = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(h2).toBeInTheDocument();
  });
  it('Testa se a página contém a seguinte imagem', () => {
    render(<NotFound />);
    const img = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
