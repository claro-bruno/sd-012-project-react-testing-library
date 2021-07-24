import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('2 - Testando o componente <About />', () => {
  it('Teste se a aplicação contém um "heading".', () => {
    renderWithRouter(<NotFound />);
    const header = screen.getByRole('heading', { name: /Page requested not found /i });
    expect(header).toBeInTheDocument();
  });
  it('Teste se a aplicação contém uma imagem.', () => {
    renderWithRouter(<NotFound />);
    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    // const image = screen.getByRole('img', { src: urlImg });
    expect(screen.getAllByRole('img')[1]).toHaveAttribute('src', urlImg);
  });
});
