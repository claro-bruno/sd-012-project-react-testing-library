/* import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa pag de detalhes', () => {
  it('testa texto da pagina', () => {
    renderWithRouter(<App />);
    const btnDetalhes = screen.getByText('More details')
    userEvent.click(btnDetalhes)
    const pokeName = screen.getByText('Pikachu')
    expect(pokeName).toBeInTheDocument()
  })
  it('testa se não há link para detalhes', () => {
    renderWithRouter(<App />);
    const btnDetalhes = screen.getByText('More details')
    userEvent.click(btnDetalhes)
    const details = screen.getByText('More Details')
    expect(details).toBeUndefined()
  })
});
 */
