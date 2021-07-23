import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    render(<NotFound />);
  });
  it('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const h2Text = screen.getByRole('heading', { level: 2 });
    expect(h2Text).toHaveTextContent('Page requested not found 😭');

    const erro404 = screen.getAllByText(/Page requested not found/i);
    expect(erro404).toBeDefined();
  });
  it('Se página mostra a imagem', () => {
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgName = 'Pikachu crying because the page requested was not found';
    const imgTest = screen.getByRole('img', { name: imgName });
    expect(imgTest.src).toBe(srcImage);
  });
});
