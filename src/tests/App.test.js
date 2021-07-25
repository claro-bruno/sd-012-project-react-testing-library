import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

beforeEach(() => {
  render(
    <Router>
      <App />
    </Router>,
  );
});

describe('Testando o componente App.js', () => {
  test('Testa o texto que contém conjunto de links no topo da página', () => {
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémon');
  });
});
