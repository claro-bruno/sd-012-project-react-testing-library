import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente NotFound.js.', () => {
  it('Verifica se: a página possui um h2 com o texto:'
  + '"Page requested not found 😭".', () => {
    renderWithRouter(<NotFound />);
    const textVerifyNotFound = screen.getByRole(
      'heading', { name: /Page requested not found/i },
    );
    const cryingEmoji = screen.getByRole('img', { name: 'Crying emoji' });
    expect(textVerifyNotFound).toBeInTheDocument();
    expect(cryingEmoji).toBeInTheDocument();
  });
  it('Verifica se: a página mostra o gif da URL em questão.', () => {
    renderWithRouter(<NotFound />);
    const gifToVerify = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gifNotFound = screen.getAllByRole('img');
    expect(gifNotFound[1]).toHaveAttribute('src', gifToVerify);
  });
});

// A verificação do emoji chorando (const cryingEmoji) eu peguei a ideia do código do Milton Castro//
