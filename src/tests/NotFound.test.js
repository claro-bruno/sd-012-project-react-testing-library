import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const headingMsg = 'Page requested not found';
    const notFoundMsg = screen.getByText(headingMsg);
    expect(notFoundMsg).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const altMsg = 'Pikachu crying because the page requested was not found';
    const imgScreen = screen.getByAltText(altMsg);
    expect(imgScreen.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
