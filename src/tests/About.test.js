import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  it('Verifica se a página contém um heading h2', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se a página contém o primeiro paragrafo', () => {
    const half1Text1 = 'One can filter Pokémons by type,';
    const half2Text1 = 'and see more details for each one of them';
    const textComplete = `${half1Text1} ${half2Text1}`;

    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(textComplete);

    expect(firstParagraph).toBeInTheDocument();
  });

  it('Verifica se a página contém o segundo paragrafo', () => {
    const textComplete = (
      'One can filter Pokémons by type, and see more details for each one of them'
    );

    renderWithRouter(<About />);

    const secondParagraph = screen.getByText(textComplete);

    expect(secondParagraph).toBeInTheDocument();
  });

  it('Verifica se a página contém uma imagem', () => {
    renderWithRouter(<About />);

    const image = screen.getByRole('img', {
      name: 'Pokédex',
    });

    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
