import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound.js', () => {
  test('Verifica se o componente NotFound é renderizado com H2 e IMG', () => {
    renderWithRouter(<NotFound />);
    const head2 = 'Page requested not found 😭';
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toHaveTextContent(head2);

    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(screen.getAllByRole('img')[1]).toHaveClass('not-found-image');
    expect(screen.getAllByRole('img')[1]).toHaveProperty('src', imgUrl);
  });
});
