import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('deve renderizar o componente About (apenas componente)', () => {
    renderWithRouter(<About />);
    const getHeading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(getHeading).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getAllByText(/Pokédex/i).length).toEqual(2);
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    const displayedImage = screen.getByRole('img');
    expect(displayedImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
