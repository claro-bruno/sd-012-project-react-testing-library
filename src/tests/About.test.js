import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Teste do componente <About />', () => {
  beforeEach(() => render(<About />));

  it(
    'A página contém um heading "h2" com o texto "About Pokédex"',
    () => {
      const aboutTitle = screen.getByRole('heading', { name: 'About Pokédex' });

      expect(aboutTitle).toBeInTheDocument();
    },
  );

  it(
    'A página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      const aboutParagraphs = screen.getAllByText(/pokémons/i);

      expect(aboutParagraphs.length).toBe(2);
    },
  );

  it(
    'A página contém a imagem de uma Pokédex',
    () => {
      const IMG_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const pokedexImage = screen.getByRole('img');

      expect(pokedexImage).toHaveProperty('src', IMG_URL);
    },
  );
});
