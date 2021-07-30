import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it('Testa se a página tem o texto "Page requested not found" no heading', () => {
    const notFoundMsg = screen.getByText('Page requested not found');
    expect(notFoundMsg).toBeInTheDocument();
  });

  it('Testa se o "src" da imagem está correto', () => {
    const img = screen.getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img[1].src).toBe(src);
  });
});
