import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe(('Testando o componente NotFound'), () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it(('Testa se existe o título "About Pokedex"'), () => {
    const title = screen.getByRole('heading', {
      name: 'Page requested not found Crying emoji',
    });
    expect(title).toBeInTheDocument();
  });

  it(('Testa se a imagem é renderizada'), () => {
    const imagePikachu = screen.getByAltText('Pikachu crying because the '
    + 'page requested was not found');
    expect(imagePikachu).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imagePikachu).toBeInTheDocument();
  });
});
