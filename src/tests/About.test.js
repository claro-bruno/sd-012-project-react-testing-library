import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o component <About />', () => {
  it('Testa se o componente possui heading h2 com texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const aboutPage = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(aboutPage).toBeInTheDocument();
  });

  it('Testa se o component possui dois parágrafos com texto sobre a Pokédex',
    () => {
      renderWithRouter(<About />);
      const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
      const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);

      expect(paragraph1).toBeInTheDocument();
      expect(paragraph2).toBeInTheDocument();
    });

  it('Testa se o component possui a imagem de uma Pokedéx', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toBeInTheDocument();
    expect(image).toHaveProperty('src', imgSrc);
  });
});
