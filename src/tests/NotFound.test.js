import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa NotFound', () => {
  test('Testa mensagem de erro', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const notFound = screen.getAllByRole('heading')[1];
    expect(notFound).toBeInTheDocument();
    expect(notFound).toHaveTextContent('Page requested not found 😭');
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
