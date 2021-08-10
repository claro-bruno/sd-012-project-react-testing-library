import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa componente About', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('Testa se contém informações sobre a Pokédex, e se tem 2 parágrafos', () => {
    const info = screen.getAllByText(/pokémons/i);
    expect(info).toHaveLength(2);
  });

  test('Testa se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    const headingText = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headingText).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem específica', () => {
    const imagem = screen.getByRole('img', { name: 'Pokédex' });
    expect(imagem.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
