import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Requisito 4 -  Testando o componente <NotFound.js />', () => {
  it('1. A página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const msg = screen.getByText(/Page requested not found/);

    expect(msg).toBeInTheDocument();
  });

  it('2. Teste se página mostra uma imagem específica', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/);
    const src = img.getAttribute('src');

    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});

// describe('', () => {
//   it('', () => {

//   });

//   it('', () => {

//   });
// });
