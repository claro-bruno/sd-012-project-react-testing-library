import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  history.push('/essa-pagina-nao-existe');
});

const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testa a página Not Found', () => {
  it('Testa se contem um heading', () => {
    const headerTitle = screen.getByText(/Page requested not found/i);
    expect(headerTitle).toBeDefined();
  });

  it('Testa a imagem de página não encontrada', () => {
    const imgInput = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgInput).toHaveAttribute('src', imgSrc);
  });
});
