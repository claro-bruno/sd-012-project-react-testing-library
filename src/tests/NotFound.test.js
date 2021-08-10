import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o componente NotFound', () => {
  test('Testa se contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    // const h2Text = screen.getByText('Page requested not found');
    // expect(h2Text).toBeInTheDocument();
    // const textAbout = screen.getByRole('heading', { level: 2 });
    const textAbout = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(textAbout).toHaveTextContent('Page requested not found');
  });
  test('Testa se página mostra a imagem', () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
