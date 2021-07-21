import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Verificando paginá não existente', () => {
  beforeEach(() => render(<NotFound />));

  it('Testando se o titulo h2 mostra "Page requested not found 😭"', () => {
    const h2 = screen.getByRole('heading');
    expect(h2).toContainHTML('<h2>Page requested not found');
    expect(h2).toContainHTML('😭');
  });

  it('Testando o link da imagem', () => {
    const img = screen.getByRole('img', { name: /pikachu/i });
    expect(img).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
