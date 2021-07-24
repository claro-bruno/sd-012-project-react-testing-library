import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  it('Testa se a página contém dois parágrafos com textos sobre a Pokédex', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/This application/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter/i)).toBeInTheDocument();
  });
  it('Testa se a página contém uma determinada imagem da Pokédex', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(screen.getByRole('img')).toHaveAttribute('src', url);
  });
});
