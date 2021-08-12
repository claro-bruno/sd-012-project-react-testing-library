import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Testa se página tem um heading h2 com o texto Page requested not found 😭', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const headingText = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(headingText).toBeInTheDocument();
  });

  test('Testa se página mostra a imagem', () => {
    const image = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    expect(image.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
