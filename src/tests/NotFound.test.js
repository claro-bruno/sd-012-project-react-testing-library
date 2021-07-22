import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa componente NotFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);

    history.push('/notfound');
  });
  it('Mensagem de página não encontrada', () => {
    const message = screen.getByRole(
      'heading',
      { name: /Page requested not found Crying emoji/i },
    );

    expect(message).toBeInTheDocument();
  });

  it('Imagem de página não encontrada', () => {
    const image = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
