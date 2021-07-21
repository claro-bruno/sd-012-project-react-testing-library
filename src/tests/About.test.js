import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

const errorImg = {
  errorImg: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
};

describe('Teste o componente <About />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });

  it('Teste se contém um heading h2 com o texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('Teste se a página contém dois parágrafos com o texto sobre Pokédex', () => {
    render(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem: ', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', errorImg.errorImg);
  });
});
