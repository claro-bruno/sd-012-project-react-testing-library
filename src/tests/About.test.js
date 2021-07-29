import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste do componente About.js.', () => {
  beforeEach(() => renderWithRouter(<About />));
  it('Verifica se: a página possui um h2 com o texto:"About Pokédex".', () => {
    const textAbout = screen.getAllByRole('heading', { name: /About Pokédex/i });
    expect(textAbout).toBeInTheDocument();
  });

  it('Verifica se: a página tem 2 parágrafos sobre a Pokédex.', () => {
    const firstParagraph = 'This application simulates a Pokédex, a digital encyclopedia'
      + ' containing all Pokémons';
    const secondParagraph = 'One can filter Pokémons by type, and see more details'
      + 'for each one of them';

    expect(screen.getByText(firstParagraph)).toBeInTheDocument();
    expect(screen.getByText(secondParagraph)).toBeInTheDocument();
  });

  it('Verifica se: a página possui a seguinte imagem da Pokédex.', () => {
    const imgToVerify = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
      + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const getImgPokédex = screen.getByRole('img');

    expect(getImgPokédex).toHaveAttribute('src', imgToVerify);
  });
});
