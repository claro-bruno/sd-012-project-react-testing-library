import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';
// Codigo de Bruno Yamamoto https://github.com/tryber/sd-012-project-react-testing-library/pull/40/files?file-filters%5B%5D=.js
describe('Testa o component Not Found', () => {
  it('Testa se a pagina contem um heading com a mensagem certa', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
    });
    expect(text).toBeDefined();
  });
  it('Testa se a imagem mostrada apresenta o link correto', () => {
    renderWithRouter(<NotFound />);
    const imgText = 'Pikachu crying because the page requested was not found';
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', { name: imgText });
    expect(img).toBeDefined();
    expect(img).toHaveAttribute('src', imgSrc);
  });
});
