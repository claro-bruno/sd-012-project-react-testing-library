import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém um heading `h2` com o texto `Page Request...', () => {
    render(<NotFound />);
    const header = screen.getByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Page requested not found 😭');
  });
  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const erroImg = screen.getAllByRole('img')[1];
    const source = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(erroImg).toBeInTheDocument();
    expect(erroImg.src).toContain(source);
  });
});
