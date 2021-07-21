import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Verificações do componente NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Verifica se possui um h2 com texto específico', () => {
    expect(screen.getByText('Page requested not found')).toBeTruthy();
    // ref https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library
  });
  it('Verifica se é exibido uma imagem específica nessa página', () => {
    const imgAltText = 'Pikachu crying because the page requested was not found';
    const findImage = screen.getByAltText(imgAltText);
    expect(findImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
