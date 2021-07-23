import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it(`Teste se página contém um heading h2 com o texto 
  "Page requested not found 😭"`, () => {
    const h2 = screen.getByRole('heading', { level: 2 });

    expect(h2).toHaveTextContent('Page requested not found 😭');
  });

  it(`Teste se página mostra a imagem:
  'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'`, () => {
    const alt = 'Pikachu crying because the page requested was not found';
    // https://testing-library.com/docs/react-testing-library/cheatsheet uso do atributo alt
    const imgAlt = screen.getByAltText(alt);

    expect(imgAlt).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
