import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('4 - Teste o componente <NotFound.js />', () => {
  test('1- Teste se contém um `h2` com o texto `Page requested not found`', () => {
    renderWithRouter(<NotFound />);
    const notFound = (screen.getByRole('heading',
      {
        level: 2, name: /Page requested not found/i,
      }));
    expect(notFound).toBeInTheDocument();
  });

  test('2- Teste se a página contém a seguinte imagem', () => {
    renderWithRouter(<NotFound />);
    const imageNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
