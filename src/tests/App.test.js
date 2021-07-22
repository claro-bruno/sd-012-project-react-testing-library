import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../rota/renderWithRouter';
import App from '../App';

describe('Testa App.js', () => {
  it('Verifica links de navegacao', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByText(/home/i);
    expect(home).toBeInTheDocument();
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
    
    const about = screen.getByText(/about/i);
    expect(about).toBeInTheDocument();
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  })

   /*  it('Verifica link de navegacao de /About', () => {
      const { history } = renderWithRouter(<App />)
      const about = screen.getByRole('link', {name: 'About'});
      userEvent.click(about);
      const history_URL = history.location.pathname;
      expect(history_URL).toBe('about');

  })

    it('Verifica link de navegacao de /favorites', () => {
      const { history } = renderWithRouter(<App />)
      const favorite = screen.getByRole('link', {name: 'Favorite Pokémons'});
      userEvent.click(favorite);
      const history_URL = history.location.pathname;
      expect(history_URL).toBe('favorites');

  })

    it('Verifica link de navegacao de /favorites', () => {
      const { history } = renderWithRouter(<App />)
      history.push('/url/desconhecida');
      const notFound = screen.getByText(/'Page requested not found'/i);
      expect(notFound).toBeInTheDocument();

  }) */
});

