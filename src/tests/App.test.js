import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWhithRouter from './renderWithRouter.test';

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

describe(' Testando click links no App', () => {
  beforeEach(() => {
    renderWhithRouter(<App />);
  });
  test('Teste se clicando o link direcionado para Home', () => {
    const linkURL = screen.getByRole('link', { name: /Home/i });
    expect(linkURL).toBeInTheDocument();
  });
  test('Teste se clicando o link direcionado para About', () => {
    const linkURL = screen.getByRole('link', { name: /About/i });
    expect(linkURL).toBeInTheDocument();
  });
  test('Teste se clicando o link direcionado para Pokémons Favoritados', () => {
    const linkURL = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(linkURL).toBeInTheDocument();
  });
});
// Acessar os elementos da tela

// Interagir com eles (se houver necessidade)

// Fazer o teste
