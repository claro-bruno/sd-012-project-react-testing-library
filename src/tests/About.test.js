import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('2 - Testando o componente <About />', () => {
  it('Teste se a aplicação contém um "heading".', () => {
    renderWithRouter(<About />);
    const header = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(header).toBeInTheDocument();
  });
  it('Teste se a aplicação contém dois paragrafos.', () => {
    renderWithRouter(<About />);
    const text1 = screen.getByText('This application simulates a Pokédex,'
      + ' a digital encyclopedia containing all Pokémons');
    expect(text1).toBeInTheDocument();
    const text2 = screen.getByText('One can filter Pokémons by type,'
      + ' and see more details for each one of them');
    expect(text2).toBeInTheDocument();
  });
  it('Teste se a aplicação contém uma imagem.', () => {
    renderWithRouter(<About />);
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    // const image = screen.getByRole('img', { src: urlImg });
    expect(screen.getByRole('img')).toHaveProperty('src', urlImg);
  });
  // it('Teste se a aplicação contém uma imagem.', () => {
  //   renderWithRouter(<About />);
  //   const header = screen.getByRole('heading', { name: /About Pokédex/i });
  //   expect(header).toBeInTheDocument();
  // });
});
