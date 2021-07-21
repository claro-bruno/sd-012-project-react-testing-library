import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('testa o componente About.js', () => {
  it('testa se a pagina contem heading com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });

  it('testa se a página contém 2 parágrafos', () => {
    renderWithRouter(<About />);
    const paragraph1 = /This application simulates a Pokédex, /i;
    const paragraph2 = /One can filter Pokémons by type, /i;
    const paragraph1Test = screen.getByText(paragraph1);
    expect(paragraph1Test).toBeInTheDocument();
    const paragraph2Test = screen.getByText(paragraph2);
    expect(paragraph2Test).toBeInTheDocument();
  });

  it('testa se a página contém uma imagem com link correto', () => {
    renderWithRouter(<About />);
    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgURL);
  });
});
