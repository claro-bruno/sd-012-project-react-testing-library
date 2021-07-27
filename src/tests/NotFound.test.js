import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste dos componentes do <NotFound.js/>', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = render(<NotFound />);
    const title = getByRole('heading', { level: 2, name: /Page requested not found/ });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém uma determinada imagem ', () => {
    const { getAllByRole } = render(<NotFound />);
    const image = getAllByRole('img');
    expect(image[1].src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
