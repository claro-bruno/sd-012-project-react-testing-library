import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import NotFound from '../components/NotFound';
import render from './renderWithRouter';

describe('Verifica pagina "Not found".', () => {
  it('Pagina "Not found" é rederizada quando uma rota inexistente é passada.', () => {
    const { history } = render(<App />);
    history.push('/erradateste');
    const message = screen.getByText(/page requested not found/i);
    expect(message).toBeInTheDocument();
  });
  it('Pagina "Not found" contém mensagem em h2 e gif corretos.', () => {
    render(<NotFound />);
    const gif = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    const message = screen.getByRole('heading', { level: 2 });
    expect(message).toBeInTheDocument();
    expect(gif).toBeInTheDocument();
    expect(gif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
