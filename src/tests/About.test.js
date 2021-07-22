import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente About.js', () => {
  test('Testa o conteúdo da página', () => {
    render(
      <About />,
    );
    const aboutTitle = screen.getByRole('heading', { name: /About Pokédex/i });
    const aboutParagraphs = screen.getAllByText(/pokémons/i);
    const imageSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImage = screen.getByRole('img', { src: imageSource });
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutParagraphs.length).toEqual(2);
    expect(aboutImage).toHaveProperty('src', imageSource);
  });
});
