import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem Crying-emoji', () => {
    // AJUDA EM: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    renderWithRouter(<NotFound />);
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
