import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testa o component About.js', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Testa se contém informações sobre a Pokédex', () => {
    const seaction = screen.getByTestId('about');
    expect(seaction).toBeInTheDocument();
  });

  test('Testa se contém um heading H2 com o texto About Pokédex', () => {
    const head = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(head).toBeInTheDocument();
    expect(head).toContainHTML('<h2>About Pokédex</h2>');
  });

  test('Testa se contém dois parágrafos com texto sobre a Pokédex', () => {
    const text1 = screen.getByTestId('info1');
    const text2 = screen.getByTestId('info2');
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
    const paragraph = screen.getAllByTitle('info');
    expect(paragraph).toHaveLength(2);
  });

  test('Testa se contém a imagem de uma pokédex', () => {
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain(url);
  });
});
