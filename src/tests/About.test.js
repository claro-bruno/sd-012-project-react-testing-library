import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2 - Testa o componente <About.js />', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const stParagraph = 'This application simulates a Pokédex, a digital encyclopedia'
        + ' containing all Pokémons';
    const ndParagraph = 'One can filter Pokémons by type, and see more details for each'
        + ' one of them';
    expect(screen.getByText(stParagraph)).toBeInTheDocument();
    expect(screen.getByText(ndParagraph)).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
        + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imageAbout = screen.getByRole('img');
    expect(imageAbout).toHaveAttribute('src', imgSrc);
  });
});
