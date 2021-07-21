import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Verificações do componente NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  it('Verifica se possui um h2 com texto específico', () => {
    expect(screen.getByText('Page requested not found')).toBeTruthy();
    // ref https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library
  });
});
