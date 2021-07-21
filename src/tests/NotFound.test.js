import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  beforeEach(() => render(<NotFound />));

  test('Teste se página contém um heading h2 com o texto "Page requested not found 😭"',
    () => {
      const heading = screen.getByRole('heading',
        { name: 'Page requested not found Crying emoji', level: 2 });
      expect(heading).toBeInTheDocument();
    });

  test('Testa se página mostra a imagem', () => {
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgAlt = 'Pikachu crying because the page requested was not found';

    const image = screen.getByAltText(imgAlt);
    expect(image).toHaveProperty('src', imgUrl);
  });
});
