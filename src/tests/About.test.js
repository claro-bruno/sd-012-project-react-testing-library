import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('Testa se a página contém o <h2/> com About Pokedéx', () => {
    render(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com texto', () => {
    render(<About />);
    const aboutParagraphs = screen.getAllByText(/Pokémons/i);
    expect(aboutParagraphs.length).toBe(2);
  });
  it('Testa se a página contém uma imagem', () => {
    render(<About />);
    const imageElement = screen.getByAltText('Pokédex');
    expect(imageElement.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
