import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Requisito 4 - Teste o componente <NotFound.js /> ', () => {
  it('', () => {
    render(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying/i);
    expect(screen.getByRole('heading')).toHaveTextContent('Page requested not found 😭');
    expect(img).toBeInTheDocument();
  });
});
