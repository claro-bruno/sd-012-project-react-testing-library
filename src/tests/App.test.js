import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWhithRouter from './renderWhithRouter.test';

describe('Testando links no App', () => {
  beforeEach(() => {
    renderWhithRouter(<App />);
  });

  test('Teste se o link direcionado para Home', () => {
    const linkURL = screen.getByRole('link', { name: /Home/i });
    expect(linkURL).toBeInTheDocument();
  });

  test('Teste se o link direcionado para About', () => {
    const linkURL = screen.getByRole('link', { name: /About/i });
    expect(linkURL).toBeInTheDocument();
  });

  test('Teste se o link direcionado para Pokémons Favoritados', () => {
    const linkURL = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkURL).toBeInTheDocument();
  });
});
