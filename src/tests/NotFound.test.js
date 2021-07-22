import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testes relacionados a pagina Not Found', () => {
  test('Verifica se o titulo e o esperado', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/wrongurl');
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Page requested not found');
    const image = screen.getAllByRole('img');
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image[1]).toHaveAttribute('src', imgSrc);
  });
});
