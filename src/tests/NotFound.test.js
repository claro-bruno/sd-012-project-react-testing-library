import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 '
  + 'com o texto Page requested not found 😭;', () => {
    render(<NotFound />);
    const msg = screen.getByRole('heading');
    expect(msg).toHaveTextContent('Page requested not found 😭');
  });

  it('Teste se a pagina exibe a imagem', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    render(<NotFound />);
    const img = screen.getAllByRole('img');
    expect(img[1].src).toBe(url);
  });
});
