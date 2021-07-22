import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Verificando paginá não existente', () => {
  beforeEach(() => render(<NotFound />));

  it('Testando se o titulo h2 mostra "Page requested not found 😭"', () => {
    const h2 = screen.getByRole('heading', {
      name: /.*Page requested not found.*/,
      level: 2,
    });
    expect(h2).toContainHTML('😭');
  });

  it('Testando o link da imagem', () => {
    const img = screen.getByRole('img', { name: /pikachu/i });
    expect(img).toHaveProperty(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
