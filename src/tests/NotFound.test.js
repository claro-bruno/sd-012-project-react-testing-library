import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import NotFound from '../components/NotFound';

// prettier-ignore
describe('Requisito 4', () => {
  it('4.1 - Teste se página contém o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const error404 = screen.getByText(/Page requested not found/i);
    expect(error404).toBeInTheDocument();
  });
  it('4.2 - Teste se página mostra a imagem.', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying because the page/i);
    expect(img).toHaveProperty(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
