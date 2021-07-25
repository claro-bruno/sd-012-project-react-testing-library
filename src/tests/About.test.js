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

  it('Teste da url da imagem', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const imageSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(image).toBeInTheDocument();
    expect(image).toHaveProperty('src', imageSrc);
  });
});
