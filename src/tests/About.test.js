import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requisito 2 - Testando o componente <About.js />', () => {
  beforeEach(() => {
    render(<About />);
  });

  it('Testa se página tem um Heading <h2> com o texto "About Pokédex', () => {
    const h2Heading = screen.getByText('About Pokédex');
    expect(h2Heading).toBeInTheDocument();
  });

  it('Testa se o "src" da imagem está correto', () => {
    const imgSrc = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(imgSrc.src).toBe(src);
  });
});
