import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Testa se a página contém as informações, e se possui 2 parágrafos', () => {
    const info = screen.getAllByText(/pokémons/i);
    expect(info).toHaveLength(2);
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const headingText = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headingText).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem na Pokédex', () => {
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
