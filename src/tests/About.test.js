import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Verifica as informações sobre a pokédex', () => {
  beforeEach(() => render(<About />));

  it('Testa o titulo', () => {
    expect(
      screen.getByRole('heading', { name: 'About Pokédex', level: 2 }),
    ).toBeDefined();
  });

  it('Testa os dois parágrafos', () => {
    const paragraphs = screen.getAllByText(
      /This application simulates a Pokédex|One can filter Pokémons by type/,
    );
    const [p1, p2] = paragraphs;

    expect(paragraphs).toHaveLength(2);
    expect(p1.localName).toBe('p');
    expect(p2.localName).toBe('p');
  });

  it('Testa o link da imagem', () => {
    expect(screen.getByRole('img')).toHaveProperty(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
