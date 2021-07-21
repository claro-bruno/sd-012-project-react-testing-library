import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});
describe('Teste o componente <NotFound.js />', () => {
  it(`Teste se página contém um heading h2 com o
  texto Page requested not found 😭`, () => {
    const message = screen.getByRole('heading', { name: /page requested not found/i });
    const emoji = screen.getByLabelText(/crying emoji/i);
    expect(message).toBeInTheDocument();
    expect(emoji).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.queryAllByRole('img');
    expect(image[1]).toHaveAttribute('src', imgUrl);
  });
});
