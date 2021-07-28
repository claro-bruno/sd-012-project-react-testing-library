import React from 'react';
import { screen } from '@testing-library/react';
import NotFount from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testa <NotFound />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFount />);
  });

  test('Testa se há um heading h2 com o texto Page requested not found', () => {
    const headingh2 = screen.getByRole('heading');
    expect(headingh2).toHaveTextContent(/Page requested not found 😭/i);
  });

  test('Testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const imageSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(/Pikachu crying because the page requested was n/i);
    expect(image).toHaveProperty('src', imageSrc);
  });
});
