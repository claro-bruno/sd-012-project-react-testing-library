import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Testa o componente About', () => {
  beforeEach(() => render(<About />));

  test('Testa se a página contém um heading h2 com o texto "About Pokédex"', () => {
    const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(heading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs.length).toBe(2);
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');
    expect(image).toHaveProperty('src', imgUrl);
  });
});
