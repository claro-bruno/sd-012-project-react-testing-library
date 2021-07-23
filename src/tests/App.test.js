import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('Teste o componente App.js', () => {
  test('Teste se a aplicação contém um conjunto fixo de links de navegação', () => {
    render(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });

    expect(linkHome).toBeDefined();
  });
});

// Acessar os elementos da tela

// Interagir com eles (se houver necessidade)

// Fazer o teste
