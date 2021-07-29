import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Teste se página contém um heading "h2" com o texto "Page requested not found"',
  () => {
    render(<NotFound />);
    const title = screen.getByRole('heading');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Page requested not found');
  });

test('Teste se página mostra uma imagem',
  () => {
    render(<NotFound />);
    const ALT_TEXT = 'Pikachu crying because the page requested was not found';
    const pikachuImage = screen.getByAltText(ALT_TEXT);
    expect(pikachuImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
