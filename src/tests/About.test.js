import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe(('Testando o componente About'), () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  it(('Testa se existe o título "About Pokedex"'), () => {
    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it(('Testa se são renderizadas as infos sobre a Pokedex'), () => {
    const text1 = 'This application simulates a Pokédex, a digital encyclopedia'
    + ' containing all Pokémons';
    const text2 = 'One can filter Pokémons by type, and see more'
      + ' details for each one of them';
    const paragraph1 = screen.getByText(text1);
    const paragraph2 = screen.getByText(text2);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it(('Testa se a imagem é renderizada'), () => {
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
