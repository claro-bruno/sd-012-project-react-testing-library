import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});

describe(' Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const title = screen.getByRole('heading',
      { name: /Page requested not found Crying emoji/i });

    expect(title).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const image = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
