import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Verifica o conteúdo do componente About', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  // Referência: Rodrigo Merlone. Repositório: https://github.com/tryber/sd-012-project-react-testing-library/pull/2/files.
  test('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs.length).toEqual(2);
  });

  test('Verifica se a página contém a imagem de uma Pokédex.', () => {
    render(<About />);
    const pokedexImg = screen.getByAltText('Pokédex');
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
