import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

beforeEach(() => {
  render(<NotFound />);
});

const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const ALT = 'Pikachu crying because the page requested was not found';

describe('Testa o componente <NotFound />', () => {
  it('testa headin h2', () => {
    const title = screen.getByText(/Page requested not found/);
    const img = screen.getByRole('img', { name: ALT });
    expect(img).toHaveAttribute('src', URL);
    expect(title).toBeInTheDocument();
  });
});
