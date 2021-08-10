import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa funcionamento do componente NotFound', () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  test('Testa se a página mostra a imagem', () => {
    const imagem = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(imagem.src).toStrictEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  test('Testa heading da página Not Found', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();

    const headingText = screen.getByRole(
      'heading',
      { name: 'Page requested not found Crying emoji',
      },
    );
    expect(headingText).toBeInTheDocument();
  });
});
