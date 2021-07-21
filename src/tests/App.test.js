import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testes realizados no App', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('Verifica se App possui conjunto fixo de links de nav', () => {
    const linkHome = screen.getByRole('link', { name: 'Home'} );
    const linkAbout = screen.getByRole('link', { name: 'About'} );
    const linkFavorites = screen.getByRole('link', { name: 'Favorite Pokémons'} );
  })
})

