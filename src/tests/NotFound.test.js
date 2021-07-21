import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando se o NotFound.js', () => {
  it('contém um h2 com o texto esperado', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/teste');

    const subtitle = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(subtitle).toBeInTheDocument();
  });

  it('mostra a imagem esperada', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/teste');

    const images = screen.getAllByRole('img');
    expect(images[1]).toHaveAttribute('src', expect.stringMatching('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'));
  });
});
