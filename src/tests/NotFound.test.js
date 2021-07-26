import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';
// import RenderWithRouter from '../RenderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Contém um heading h2 com o texto Page "requested not found" ', () => {
    const { getByRole } = render(<NotFound />);
    const h2NotFound = getByRole('heading', { level: 2 });
    expect(h2NotFound).toBeInTheDocument();
    expect(h2NotFound.textContent).toMatch(/Page requested not found/i);
  });

  it('Teste se página mostra a imagem da URL expectedURL.', () => {
    const { getByAltText } = render(<NotFound />);
    const expectedURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundIMG = getByAltText(/Pikachu crying because/i);
    expect(notFoundIMG).toHaveAttribute('src', expectedURL);
  });
});
