import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByText(/Page requested not found/);
    expect(heading).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem correta', () => {
    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/);
    expect(img.src).toBe(imgURL);
  });
});
