import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste do componente <NotFound />', () => {
  beforeEach(() => render(<NotFound />));

  it(
    'A página contém um heading "h2" com o texto "Page requested not found 😭"',
    () => {
      const textMatchRegex = /Page requested not found/i;
      const notFoundTitle = screen.getByRole('heading', { name: textMatchRegex });

      expect(notFoundTitle).toBeInTheDocument();
    },
  );

  it(
    'A página contém a imagem de um Pikachu chorando',
    () => {
      const altText = 'Pikachu crying because the page requested was not found';
      const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      const cryingPikachu = screen.getByAltText(altText);

      expect(cryingPikachu).toHaveProperty('src', IMG_URL);
    },
  );
});
