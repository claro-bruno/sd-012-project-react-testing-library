import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

const expectedImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testando o componente about', () => {
  test('Verifica se a página tem um heading h2', () => {
    render(<About />);
    const h2 = screen.getByRole('heading');
    expect(h2).toBeInTheDocument();
  });

  test('Verifica se o heading contém o texto "About Pokédex"', () => {
    render(<About />);
    const h2 = screen.getByRole('heading');
    expect(h2.innerHTML).toBe('About Pokédex');
  });

  test('Verifica se a página contém a imagem correta', () => {
    render(<About />);
    const img = screen.getByAltText(/Pokédex/i);
    expect(img.src).toBe(expectedImg);
  });
});
