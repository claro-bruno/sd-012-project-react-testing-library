import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Verifica o conteúdo do componente NotFound', () => {
  test('Verifica se página contém o texto Page requested not found', () => {
    render(<NotFound />);
    const notFoundMessage = screen.getByRole(
      'heading', { name: 'Page requested not found Crying emoji' },
    );
    expect(notFoundMessage).toBeInTheDocument();
  });

  test('Verifica se página mostra uma imagem', () => {
    render(<NotFound />);
    const cryingPikachuImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(cryingPikachuImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
